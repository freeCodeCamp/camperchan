import {
  ChannelType,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder
} from "discord.js";

import { Command } from "../interfaces/Command.js";
import { Subcommand } from "../interfaces/Subcommand.js";
import { errorHandler } from "../utils/errorHandler.js";

import { handlePrivate } from "./subcommands/management/handlePrivate.js";
import { handleRole } from "./subcommands/management/handleRole.js";
import { handleTickets } from "./subcommands/management/handleTickets.js";

const handlers: { [key: string]: Subcommand } = {
  private: handlePrivate,
  role: handleRole,
  tickets: handleTickets
};

export const management: Command = {
  data: new SlashCommandBuilder()
    .setName("management")
    .setDescription("Commands related to server management.")
    .setDMPermission(false)
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("private")
        .setDescription("Creates a private discussion channel with a user.")
        .addUserOption((option) =>
          option
            .setName("target")
            .setDescription("The user to create a private channel with.")
            .setRequired(true)
        )
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("role")
        .setDescription(
          "Creates a post with buttons for self-assignable roles."
        )
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("Channel to create the post in.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("header")
            .setDescription("Text to include at the top of the post.")
            .setRequired(true)
        )
        .addRoleOption((option) =>
          option
            .setName("role1")
            .setDescription("Role to create a button for.")
            .setRequired(true)
        )
        .addRoleOption((option) =>
          option.setName("role2").setDescription("Role to create a button for.")
        )
        .addRoleOption((option) =>
          option.setName("role3").setDescription("Role to create a button for.")
        )
        .addRoleOption((option) =>
          option.setName("role4").setDescription("Role to create a button for.")
        )
        .addRoleOption((option) =>
          option.setName("role5").setDescription("Role to create a button for.")
        )
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("tickets")
        .setDescription("Create a ticket post in the specified channel")
        .addChannelOption((o) =>
          o
            .setName("channel")
            .setDescription("The channel to create the ticket post in.")
            .addChannelTypes(ChannelType.GuildText)
        )
    ),
  run: async (CamperChan, interaction) => {
    try {
      const handler = handlers[interaction.options.getSubcommand(true)];
      if (!handler) {
        await interaction.reply("Invalid subcommand.");
        return;
      }
      if (!handler.permissionValidator(interaction.member)) {
        await interaction.reply("You do not have permission to do this.");
        return;
      }
      await handler.execute(CamperChan, interaction);
    } catch (err) {
      await errorHandler(CamperChan, "management command", err);
    }
  }
};

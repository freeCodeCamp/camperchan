import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageActionRow, MessageButton } from "discord.js";

import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";

export const role: Command = {
  data: new SlashCommandBuilder()
    .setName("role")
    .setDescription("Creates a post with buttons for self-assignable roles.")
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
        .setName("role")
        .setDescription("Role to create a button for.")
        .setRequired(true)
    ),
  run: async (Bot, interaction) => {
    try {
      await interaction.deferReply();

      if (
        !interaction.member ||
        typeof interaction.member.permissions === "string" ||
        !interaction.member.permissions.has("MANAGE_ROLES")
      ) {
        await interaction.editReply(
          "You do not have permission to use this command."
        );
        return;
      }

      const channel = interaction.options.getChannel("channel", true);
      const title = interaction.options.getString("header", true);
      const role = interaction.options.getRole("role", true);

      if (!("send" in channel)) {
        await interaction.editReply(
          "Channel does not appear to be a text channel."
        );
        return;
      }

      const button = new MessageButton()
        .setLabel(role.name)
        .setCustomId(`rr-${role.id}`)
        .setStyle("SECONDARY");
      const row = new MessageActionRow().addComponents(button);

      await channel.send({ content: title, components: [row] });
      await interaction.editReply("Posted the role buttons.");
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply("Something went wrong.");
    }
  },
};

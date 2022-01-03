import { SlashCommandBuilder } from "@discordjs/builders";
import {
  CategoryChannel,
  GuildChannelCreateOptions,
  MessageActionRow,
  MessageButton,
  TextChannel,
} from "discord.js";

import { Command } from "../interfaces/Command";
import { createLogFile } from "../modules/createLogFile";
import { errorHandler } from "../utils/errorHandler";

export const privateChannel: Command = {
  data: new SlashCommandBuilder()
    .setName("private")
    .setDescription("Creates a private discussion channel with a user.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user to create a private channel with.")
        .setRequired(true)
    ),
  run: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const { member, guild } = interaction;
      if (!member || !guild) {
        await interaction.editReply(
          "This command can only be used in a server."
        );
        return;
      }
      const modRole = guild.roles.cache.find(
        (role) => role.id === Bot.config.mod_role
      );

      if (!modRole) {
        await interaction.editReply("The mod role does not exist.");
        return;
      }

      if (
        typeof member.permissions === "string" ||
        !member.permissions.has("MODERATE_MEMBERS")
      ) {
        await interaction.editReply(
          "You do not have permission to use this command."
        );
        return;
      }

      const target = interaction.options.getUser("target", true);

      let category = guild.channels.cache.find(
        (c) =>
          c.id === Bot.config.private_category && c.type === "GUILD_CATEGORY"
      );
      if (!category) {
        category = await guild.channels.create("Private Discussions", {
          type: "GUILD_CATEGORY",
          permissionOverwrites: [
            {
              id: guild.id,
              deny: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"],
            },
            {
              id: modRole.id,
              allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"],
            },
            {
              id: Bot.config.bot_id,
              allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"],
            },
          ],
        });
      }

      // Create channel
      const channelName = `private-${target.username}`;

      const channelOpts: GuildChannelCreateOptions = {
        type: "GUILD_TEXT",
        permissionOverwrites: [
          {
            id: target.id,
            allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"],
            deny: ["CREATE_INSTANT_INVITE"],
          },
          {
            id: guild.id,
            deny: [
              "VIEW_CHANNEL",
              "READ_MESSAGE_HISTORY",
              "SEND_MESSAGES",
              "CREATE_INSTANT_INVITE",
            ],
          },
          {
            id: Bot.config.bot_id,
            allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"],
            deny: ["CREATE_INSTANT_INVITE"],
          },
          {
            id: modRole,
            allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"],
            deny: ["CREATE_INSTANT_INVITE"],
          },
        ],
      };

      if (category) {
        channelOpts.parent = category as CategoryChannel;
      }

      const newChannel = (await guild.channels.create(
        channelName,
        channelOpts
      )) as TextChannel;

      await createLogFile(Bot, newChannel.id);

      const closeButton = new MessageButton()
        .setCustomId("close-channel")
        .setLabel("Close")
        .setEmoji("❌")
        .setStyle("DANGER");
      const row = new MessageActionRow().addComponents([closeButton]);

      await newChannel.send({
        content: `Hey <@!${target.id}>!\n\nThe moderation team have created this private channel to discuss something with you.`,
        components: [row],
      });
      await Bot.config.mod_hook.send(
        `Private channel created for ${target.tag}`
      );
      await interaction.editReply("Channel created!");
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply("Something went wrong!");
    }
  },
};

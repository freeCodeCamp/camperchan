import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CategoryChannel,
  ChannelType,
  GuildChannelCreateOptions,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";

import { PrivilegedCommand } from "../interfaces/PrivilegedCommand";
import { createLogFile } from "../modules/createLogFile";
import { errorHandler } from "../utils/errorHandler";

export const privateChannel: PrivilegedCommand = {
  guildOnly: true,
  requiredPermissions: [PermissionFlagsBits.ModerateMembers],
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
      const { guild } = interaction;

      const modRole = guild.roles.cache.find(
        (role) => role.id === Bot.config.mod_role
      );

      if (!modRole) {
        await interaction.editReply("The mod role does not exist.");
        return;
      }

      const target = interaction.options.getUser("target", true);

      const category = Bot.privateCategory;

      // Create channel
      const channelName = `private-${target.username}`;

      const channelOpts: GuildChannelCreateOptions = {
        name: channelName,
        type: ChannelType.GuildText,
        parent: category,
        permissionOverwrites: [
          {
            id: target.id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.SendMessages,
            ],
            deny: [PermissionFlagsBits.CreateInstantInvite],
          },
          {
            id: guild.id,
            deny: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.CreateInstantInvite,
            ],
          },
          {
            id: Bot.config.bot_id,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.SendMessages,
            ],
            deny: [PermissionFlagsBits.CreateInstantInvite],
          },
          {
            id: modRole,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.SendMessages,
            ],
            deny: [PermissionFlagsBits.CreateInstantInvite],
          },
        ],
      };

      const newChannel = await guild.channels.create(channelOpts);

      await createLogFile(Bot, newChannel.id);

      const closeButton = new ButtonBuilder()
        .setCustomId("close-channel")
        .setLabel("Close")
        .setEmoji("❌")
        .setStyle(ButtonStyle.Danger);
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
        closeButton,
      ]);

      await newChannel.send({
        content: `Hey <@!${target.id}>!\n\nA private channel was created. This channel is visible to only you and the moderation team.`,
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

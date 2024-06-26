import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  GuildChannelCreateOptions,
  PermissionFlagsBits
} from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand.js";
import { createLogFile } from "../../../modules/createLogFile.js";
import { errorHandler } from "../../../utils/errorHandler.js";

export const handlePrivate: Subcommand = {
  permissionValidator: (member) =>
    [
      PermissionFlagsBits.ModerateMembers,
      PermissionFlagsBits.KickMembers,
      PermissionFlagsBits.BanMembers
    ].some((p) => member.permissions.has(p)),
  execute: async (CamperChan, interaction) => {
    try {
      await interaction.deferReply();
      const { guild } = interaction;

      const modRole = guild.roles.cache.find(
        (role) => role.id === CamperChan.config.modRole
      );

      if (!modRole) {
        await interaction.editReply("The mod role does not exist.");
        return;
      }

      const target = interaction.options.getUser("target", true);

      const category = CamperChan.privateCategory;

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
              PermissionFlagsBits.SendMessages
            ],
            deny: [PermissionFlagsBits.CreateInstantInvite]
          },
          {
            id: guild.id,
            deny: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.CreateInstantInvite
            ]
          },
          {
            id: CamperChan.config.botId,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.SendMessages
            ],
            deny: [PermissionFlagsBits.CreateInstantInvite]
          },
          {
            id: modRole,
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.SendMessages
            ],
            deny: [PermissionFlagsBits.CreateInstantInvite]
          }
        ]
      };

      const newChannel = await guild.channels.create(channelOpts);

      await createLogFile(CamperChan, newChannel.id);

      const closeButton = new ButtonBuilder()
        .setCustomId("close-channel")
        .setLabel("Close")
        .setEmoji("❌")
        .setStyle(ButtonStyle.Danger);
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
        closeButton
      ]);

      await newChannel.send({
        content: `Hey <@!${target.id}>!\n\nA private channel was created. This channel is visible to only you and the moderation team.`,
        components: [row]
      });
      await CamperChan.config.modHook.send(
        `Private channel created for ${target.tag}`
      );
      await interaction.editReply("Channel created!");
    } catch (err) {
      await errorHandler(CamperChan, "private subcommand", err);
      await interaction.editReply("Something went wrong!");
    }
  }
};

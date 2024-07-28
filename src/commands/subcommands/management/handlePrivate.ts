import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType,
  type GuildChannelCreateOptions,
  PermissionFlagsBits,
} from "discord.js";
import { createLogFile } from "../../../modules/createLogFile.js";
import { errorHandler } from "../../../utils/errorHandler.js";
import type { Subcommand } from "../../../interfaces/subcommand.js";

export const handlePrivate: Subcommand = {
  execute: async(camperChan, interaction) => {
    try {
      await interaction.deferReply();
      const { guild, options } = interaction;

      const moduleRole = guild.roles.cache.find(
        (role) => {
          return role.id === camperChan.config.modRole;
        },
      );

      if (!moduleRole) {
        await interaction.editReply("The mod role does not exist.");
        return;
      }

      const target = options.getUser("target", true);

      const category = camperChan.privateCategory;

      // Create channel
      const channelName = `private-${target.username}`;

      const channelOptions: GuildChannelCreateOptions = {
        name:                 channelName,
        parent:               category,
        permissionOverwrites: [
          {
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.SendMessages,
            ],
            deny: [ PermissionFlagsBits.CreateInstantInvite ],
            id:   target.id,
          },
          {
            deny: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.CreateInstantInvite,
            ],
            id: guild.id,
          },
          {
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.SendMessages,
            ],
            deny: [ PermissionFlagsBits.CreateInstantInvite ],
            id:   camperChan.config.botId,
          },
          {
            allow: [
              PermissionFlagsBits.ViewChannel,
              PermissionFlagsBits.ReadMessageHistory,
              PermissionFlagsBits.SendMessages,
            ],
            deny: [ PermissionFlagsBits.CreateInstantInvite ],
            id:   moduleRole,
          },
        ],
        type: ChannelType.GuildText,
      };

      const createdChannel = await guild.channels.create(channelOptions);

      await createLogFile(camperChan, createdChannel.id);

      const closeButton = new ButtonBuilder().
        setCustomId("close-channel").
        setLabel("Close").
        setEmoji("❌").
        setStyle(ButtonStyle.Danger);
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
        closeButton,
      ]);

      await createdChannel.send({
        components: [ row ],
        content:    `Hey <@!${target.id}>!\n\nA private channel was created. This channel is visible to only you and the moderation team.`,
      });
      await camperChan.config.modHook.send(
        `Private channel created for ${target.tag}`,
      );
      await interaction.editReply("Channel created!");
    } catch (error) {
      await errorHandler(camperChan, "private subcommand", error);
      await interaction.editReply("Something went wrong!");
    }
  },
  permissionValidator: (member) => {
    return [
      PermissionFlagsBits.ModerateMembers,
      PermissionFlagsBits.KickMembers,
      PermissionFlagsBits.BanMembers,
    ].some((p) => {
      return member.permissions.has(p);
    });
  },
};

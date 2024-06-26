import {
  ButtonInteraction,
  ChannelType,
  EmbedBuilder,
  PermissionFlagsBits
} from "discord.js";

import { ExtendedClient } from "../interfaces/ExtendedClient.js";
import { errorHandler } from "../utils/errorHandler.js";

import { generateLogs } from "./generateLogs.js";

/**
 * Handles the logic to close a private channel, generating the logs and sending them to
 * the moderation hook.
 *
 * @param {ExtendedClient} CamperChan The CamperChan's discord instance.
 * @param {ButtonInteraction} interaction The interaction payload from Discord.
 */
export const closePrivateChannel = async (
  CamperChan: ExtendedClient,
  interaction: ButtonInteraction
) => {
  try {
    await interaction.deferReply();
    const { channel, member } = interaction;
    if (!channel || !member || channel.type === ChannelType.DM) {
      await interaction.editReply("Cannot find your member object.");
      return;
    }

    if (
      typeof member.permissions === "string" ||
      !member.permissions.has(PermissionFlagsBits.ModerateMembers)
    ) {
      await interaction.editReply(
        "Only moderators may close a private channel."
      );
      return;
    }

    const logEmbed = new EmbedBuilder();
    logEmbed.setTitle("Private Channel Closed");
    logEmbed.setDescription(`Channel closed by ${member.user.username}`);
    logEmbed.addFields({
      name: "User",
      value: channel.name.split("-").slice(1).join("-") || "Unknown"
    });
    const logFile = await generateLogs(CamperChan, channel.id);
    await CamperChan.config.modHook.send({
      embeds: [logEmbed],
      files: [logFile]
    });
    await channel.delete();
  } catch (err) {
    await errorHandler(CamperChan, "close private channel module", err);
    await interaction.editReply("Something went wrong!");
  }
};

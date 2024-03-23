import {
  ButtonInteraction,
  ChannelType,
  EmbedBuilder,
  PermissionFlagsBits
} from "discord.js";

import { ExtendedClient } from "../interfaces/ExtendedClient";
import { errorHandler } from "../utils/errorHandler";

import { generateLogs } from "./generateLogs";

/**
 * Handles the logic to close a private channel, generating the logs and sending them to
 * the moderation hook.
 *
 * @param {ExtendedClient} Bot The bot's discord instance.
 * @param {ButtonInteraction} interaction The interaction payload from Discord.
 */
export const closePrivateChannel = async (
  Bot: ExtendedClient,
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
    const logFile = await generateLogs(Bot, channel.id);
    await Bot.config.modHook.send({ embeds: [logEmbed], files: [logFile] });
    await channel.delete();
  } catch (err) {
    await errorHandler(Bot, "close private channel module", err);
    await interaction.editReply("Something went wrong!");
  }
};

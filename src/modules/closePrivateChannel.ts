import {
  type ButtonInteraction,
  ChannelType,
  EmbedBuilder,
  PermissionFlagsBits,
} from "discord.js";
import { errorHandler } from "../utils/errorHandler.js";
import { generateLogs } from "./generateLogs.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";

/**
 * Handles the logic to close a private channel, generating the logs and sending them to
 * the moderation hook.
 * @param camperChan - The camperChan's discord instance.
 * @param interaction - The interaction payload from Discord.
 */
export const closePrivateChannel = async(
  camperChan: ExtendedClient,
  interaction: ButtonInteraction,
): Promise<void> => {
  try {
    await interaction.deferReply();
    const { channel, member } = interaction;
    if (
      !channel
      || !member
      || channel.type === ChannelType.DM
      || channel.type === ChannelType.GroupDM
    ) {
      await interaction.editReply("Cannot find your member object.");
      return;
    }

    if (
      typeof member.permissions === "string"
      || !member.permissions.has(PermissionFlagsBits.ModerateMembers)
    ) {
      await interaction.editReply(
        "Only moderators may close a private channel.",
      );
      return;
    }

    const logEmbed = new EmbedBuilder();
    logEmbed.setTitle("Private Channel Closed");
    logEmbed.setDescription(`Channel closed by ${member.user.username}`);
    logEmbed.addFields({
      name:  "User",
      value: channel.name.split("-").slice(1).
        join("-"),
    });
    const logFile = await generateLogs(camperChan, channel.id);
    await camperChan.config.modHook.send({
      embeds: [ logEmbed ],
      files:  [ logFile ],
    });
    await channel.delete();
  } catch (error) {
    await errorHandler(camperChan, "close private channel module", error);
    await interaction.editReply("Something went wrong!");
  }
};

import { ButtonInteraction, MessageEmbed, TextChannel } from "discord.js";

import { Camperbot } from "../interfaces/Camperbot";
import { errorHandler } from "../utils/errorHandler";

import { generateLogs } from "./generateLogs";

/**
 * Handles the logic to close a private channel, generating the logs and sending them to
 * the moderation hook.
 *
 * @param {Camperbot} Bot The bot's discord instance.
 * @param {ButtonInteraction} interaction The interaction payload from Discord.
 */
export const closePrivateChannel = async (
  Bot: Camperbot,
  interaction: ButtonInteraction
) => {
  try {
    await interaction.deferReply();
    const { channel, member } = interaction;
    if (!channel || !member) {
      await interaction.editReply("Cannot find your member object.");
      return;
    }

    if (
      typeof member.permissions === "string" ||
      !member.permissions.has("MODERATE_MEMBERS")
    ) {
      await interaction.editReply(
        "Only moderators may close a private channel."
      );
      return;
    }

    const logEmbed = new MessageEmbed();
    logEmbed.setTitle("Private Channel Closed");
    logEmbed.setDescription(`Channel closed by ${member.user.username}`);
    logEmbed.addField(
      "User",
      (channel as TextChannel).name.split("-").slice(1).join("-") || "Unknown"
    );
    const logFile = await generateLogs(Bot, channel.id);
    await Bot.config.mod_hook.send({ embeds: [logEmbed], files: [logFile] });
    await channel.delete();
  } catch (err) {
    await errorHandler(Bot, err);
    await interaction.editReply("Something went wrong!");
  }
};

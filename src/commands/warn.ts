import { EmbedBuilder, SlashCommandBuilder } from "discord.js";

import { Command } from "../interfaces/Command";
import { sendModerationDm } from "../modules/sendModerationDm";
import { updateHistory } from "../modules/updateHistory";
import { customSubstring } from "../utils/customSubstring";
import { errorHandler } from "../utils/errorHandler";

export const warn: Command = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Issues a warning to a user.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user to warn.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for issuing this warning.")
        .setRequired(true)
    ),
  run: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const { guild, member } = interaction;

      const target = interaction.options.getUser("target", true);
      const reason = interaction.options.getString("reason", true);

      if (target.id === member.user.id) {
        await interaction.editReply("You cannot warn yourself.");
        return;
      }

      if (target.id === Bot.user?.id) {
        await interaction.editReply("You cannot warn the bot.");
        return;
      }

      const sentNotice = await sendModerationDm(
        Bot,
        "warn",
        target,
        guild.name,
        reason
      );

      await updateHistory(Bot, "warn", target.id);

      const warnEmbed = new EmbedBuilder();
      warnEmbed.setTitle("A user has been warned.");
      warnEmbed.setDescription(`Warning issued by ${member.user.username}`);
      warnEmbed.addFields(
        {
          name: "Reason",
          value: customSubstring(reason, 1000),
        },
        {
          name: "User Notified?",
          value: String(sentNotice),
        }
      );
      warnEmbed.setTimestamp();
      warnEmbed.setAuthor({
        name: target.tag,
        iconURL: target.displayAvatarURL(),
      });
      warnEmbed.setFooter({
        text: `ID: ${target.id}`,
      });

      await interaction.editReply(
        sentNotice ? "They have been warned." : "I could not warn them."
      );
      await Bot.config.mod_hook.send({
        embeds: [warnEmbed],
      });
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply("Something went wrong.");
    }
  },
};

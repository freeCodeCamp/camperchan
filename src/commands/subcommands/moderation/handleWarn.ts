import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand";
import { sendModerationDm } from "../../../modules/sendModerationDm";
import { updateHistory } from "../../../modules/updateHistory";
import { customSubstring } from "../../../utils/customSubstring";
import { errorHandler } from "../../../utils/errorHandler";

export const handleWarn: Subcommand = {
  permissionValidator: (member) =>
    [
      PermissionFlagsBits.ModerateMembers,
      PermissionFlagsBits.KickMembers,
      PermissionFlagsBits.BanMembers
    ].some((p) => member.permissions.has(p)),
  execute: async (Bot, interaction) => {
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
          value: customSubstring(reason, 1000)
        },
        {
          name: "User Notified?",
          value: String(sentNotice)
        }
      );
      warnEmbed.setTimestamp();
      warnEmbed.setAuthor({
        name: target.tag,
        iconURL: target.displayAvatarURL()
      });
      warnEmbed.setFooter({
        text: `ID: ${target.id}`
      });

      await interaction.editReply(
        sentNotice ? "They have been warned." : "I could not warn them."
      );
      await Bot.config.modHook.send({
        embeds: [warnEmbed]
      });
    } catch (err) {
      await errorHandler(Bot, "warn subcommand", err);
      await interaction.editReply("Something went wrong.");
    }
  }
};

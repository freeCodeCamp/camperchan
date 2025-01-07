import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { sendModerationDm } from "../../../modules/sendModerationDm.js";
import { updateHistory } from "../../../modules/updateHistory.js";
import { customSubstring } from "../../../utils/customSubstring.js";
import { errorHandler } from "../../../utils/errorHandler.js";
import type { Subcommand } from "../../../interfaces/subcommand.js";

export const handleWarn: Subcommand = {
  execute: async(camperChan, interaction) => {
    try {
      await interaction.deferReply();
      const { guild, member, options } = interaction;

      const target = options.getUser("target", true);
      const reason = options.getString("reason", true);

      if (target.id === member.user.id) {
        await interaction.editReply("You cannot warn yourself.");
        return;
      }

      if (target.id === camperChan.user?.id) {
        await interaction.editReply("You cannot warn the camperChan.");
        return;
      }

      const sentNotice = await sendModerationDm(
        camperChan,
        {
          action:    "warn",
          guildName: guild.name,
          reason:    customSubstring(reason, 1000),
          user:      target,
        },
      );

      await updateHistory(camperChan, "warn", target.id);

      const warnEmbed = new EmbedBuilder();
      warnEmbed.setTitle("A user has been warned.");
      warnEmbed.setDescription(`Warning issued by ${member.user.username}`);
      warnEmbed.addFields(
        {
          name:  "Reason",
          value: customSubstring(reason, 1000),
        },
        {
          name:  "User Notified?",
          value: String(sentNotice),
        },
      );
      warnEmbed.setTimestamp();
      warnEmbed.setAuthor({
        iconURL: target.displayAvatarURL(),
        name:    target.tag,
      });
      warnEmbed.setFooter({
        text: `ID: ${target.id}`,
      });

      await interaction.editReply(
        sentNotice
          ? "They have been warned."
          : "I could not warn them.",
      );
      await camperChan.config.modHook.send({
        embeds: [ warnEmbed ],
      });
    } catch (error) {
      await errorHandler(camperChan, "warn subcommand", error);
      await interaction.editReply("Something went wrong.");
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

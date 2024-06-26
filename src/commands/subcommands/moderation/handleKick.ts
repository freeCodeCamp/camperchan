import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand.js";
import { sendModerationDm } from "../../../modules/sendModerationDm.js";
import { updateHistory } from "../../../modules/updateHistory.js";
import { customSubstring } from "../../../utils/customSubstring.js";
import { errorHandler } from "../../../utils/errorHandler.js";

export const handleKick: Subcommand = {
  permissionValidator: (member) =>
    member.permissions.has(PermissionFlagsBits.KickMembers),
  execute: async (CamperChan, interaction) => {
    try {
      await interaction.deferReply();
      const { guild, member } = interaction;
      const target = interaction.options.getUser("target", true);
      const reason = interaction.options.getString("reason", true);

      if (target.id === member.user.id) {
        await interaction.editReply("You cannot kick yourself.");
        return;
      }
      if (target.id === CamperChan.user?.id) {
        await interaction.editReply("You cannot kick the CamperChan.");
        return;
      }

      const targetMember = await guild.members
        .fetch(target.id)
        .catch(() => null);

      if (!targetMember || !targetMember.kickable) {
        await interaction.editReply("I cannot kick them.");
        return;
      }

      const sentNotice = await sendModerationDm(
        CamperChan,
        "kick",
        target,
        guild.name,
        reason
      );

      await targetMember.kick(customSubstring(reason, 1000));

      await updateHistory(CamperChan, "kick", target.id);

      const kickLogEmbed = new EmbedBuilder();
      kickLogEmbed.setTitle("Member kicked.");
      kickLogEmbed.setDescription(
        `Member removal was requested by ${member.user.username}`
      );
      kickLogEmbed.addFields(
        {
          name: "Reason",
          value: customSubstring(reason, 1000)
        },
        {
          name: "User notified?",
          value: String(sentNotice)
        }
      );
      kickLogEmbed.setTimestamp();
      kickLogEmbed.setAuthor({
        name: target.tag,
        iconURL: target.displayAvatarURL()
      });
      kickLogEmbed.setFooter({
        text: `ID: ${target.id}`
      });

      await CamperChan.config.modHook.send({ embeds: [kickLogEmbed] });
      await interaction.editReply({ content: "They have been kicked." });
    } catch (err) {
      await errorHandler(CamperChan, "kick subcommand", err);
      await interaction.editReply("Something went wrong.");
    }
  }
};

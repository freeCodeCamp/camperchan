import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand.js";
import { sendModerationDm } from "../../../modules/sendModerationDm.js";
import { updateHistory } from "../../../modules/updateHistory.js";
import { customSubstring } from "../../../utils/customSubstring.js";
import { errorHandler } from "../../../utils/errorHandler.js";

export const handleBan: Subcommand = {
  permissionValidator: (member) =>
    member.permissions.has(PermissionFlagsBits.BanMembers),
  execute: async (CamperChan, interaction) => {
    try {
      await interaction.deferReply();
      const { guild, member } = interaction;
      const target = interaction.options.getUser("target", true);
      const reason = interaction.options.getString("reason", true);

      if (target.id === member.user.id) {
        await interaction.editReply("You cannot ban yourself.");
        return;
      }
      if (target.id === CamperChan.user?.id) {
        await interaction.editReply("You cannot ban the CamperChan.");
        return;
      }

      const targetMember = await guild.members
        .fetch(target.id)
        .catch(() => null);

      if (!targetMember || !targetMember.bannable) {
        await interaction.editReply("I cannot ban them.");
        return;
      }

      const sentNotice = await sendModerationDm(
        CamperChan,
        "ban",
        target,
        guild.name,
        reason
      );

      await targetMember.ban({
        reason: customSubstring(reason, 1000),
        deleteMessageDays: 1
      });

      await updateHistory(CamperChan, "ban", target.id);

      const banLogEmbed = new EmbedBuilder();
      banLogEmbed.setTitle("Member banned.");
      banLogEmbed.setDescription(
        `Member ban was requested by ${member.user.username}`
      );
      banLogEmbed.addFields([
        {
          name: "Reason",
          value: customSubstring(reason, 1000)
        },
        {
          name: "User notified?",
          value: String(sentNotice)
        }
      ]);
      banLogEmbed.setTimestamp();
      banLogEmbed.setAuthor({
        name: target.tag,
        iconURL: target.displayAvatarURL()
      });
      banLogEmbed.setFooter({
        text: `ID: ${target.id}`
      });

      await CamperChan.config.modHook.send({ embeds: [banLogEmbed] });
      await interaction.editReply({
        content: "They have been banned."
      });
    } catch (err) {
      await errorHandler(CamperChan, "ban subcommand", err);
      await interaction.editReply("Something went wrong.");
    }
  }
};

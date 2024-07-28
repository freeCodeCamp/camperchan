import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { sendModerationDm } from "../../../modules/sendModerationDm.js";
import { updateHistory } from "../../../modules/updateHistory.js";
import { customSubstring } from "../../../utils/customSubstring.js";
import { errorHandler } from "../../../utils/errorHandler.js";
import type { Subcommand } from "../../../interfaces/subcommand.js";

export const handleBan: Subcommand = {
  execute: async(camperChan, interaction) => {
    try {
      await interaction.deferReply();
      const { guild, member, options } = interaction;
      const target = options.getUser("target", true);
      const reason = options.getString("reason", true);

      if (target.id === member.user.id) {
        await interaction.editReply("You cannot ban yourself.");
        return;
      }
      if (target.id === camperChan.user?.id) {
        await interaction.editReply("You cannot ban the camperChan.");
        return;
      }

      const targetMember = await guild.members.
        fetch(target.id).
        catch(() => {
          return null;
        });

      if (!targetMember) {
        await interaction.editReply("I could not find that member.");
        return;
      }

      if (!targetMember.bannable) {
        await interaction.editReply("I cannot ban them.");
        return;
      }

      const sentNotice = await sendModerationDm(
        camperChan,
        "ban",
        target,
        guild.name,
        reason,
      );

      await targetMember.ban({
        deleteMessageDays: 1,
        reason:            customSubstring(reason, 1000),
      });

      await updateHistory(camperChan, "ban", target.id);

      const banLogEmbed = new EmbedBuilder();
      banLogEmbed.setTitle("Member banned.");
      banLogEmbed.setDescription(
        `Member ban was requested by ${member.user.username}`,
      );
      banLogEmbed.addFields([
        {
          name:  "Reason",
          value: customSubstring(reason, 1000),
        },
        {
          name:  "User notified?",
          value: String(sentNotice),
        },
      ]);
      banLogEmbed.setTimestamp();
      banLogEmbed.setAuthor({
        iconURL: target.displayAvatarURL(),
        name:    target.tag,
      });
      banLogEmbed.setFooter({
        text: `ID: ${target.id}`,
      });

      await camperChan.config.modHook.send({ embeds: [ banLogEmbed ] });
      await interaction.editReply({
        content: "They have been banned.",
      });
    } catch (error) {
      await errorHandler(camperChan, "ban subcommand", error);
      await interaction.editReply("Something went wrong.");
    }
  },
  permissionValidator: (member) => {
    return member.permissions.has(PermissionFlagsBits.BanMembers);
  },
};

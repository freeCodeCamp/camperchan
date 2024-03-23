import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand";
import { sendModerationDm } from "../../../modules/sendModerationDm";
import { updateHistory } from "../../../modules/updateHistory";
import {
  calculateMilliseconds,
  isValidTimeUnit
} from "../../../utils/calculateMilliseconds";
import { customSubstring } from "../../../utils/customSubstring";
import { errorHandler } from "../../../utils/errorHandler";

export const handleMute: Subcommand = {
  permissionValidator: (member) =>
    member.permissions.has(PermissionFlagsBits.ModerateMembers),
  execute: async (CamperChan, interaction) => {
    try {
      await interaction.deferReply();
      const { guild, member } = interaction;
      const target = interaction.options.getUser("target", true);
      const duration = interaction.options.getInteger("duration", true);
      const durationUnit = interaction.options.getString("unit", true);
      const reason = interaction.options.getString("reason", true);

      if (!isValidTimeUnit(durationUnit)) {
        await interaction.editReply({
          content: `${durationUnit} is not a valid duration unit.`
        });
        return;
      }

      const durationMilliseconds = calculateMilliseconds(
        duration,
        durationUnit
      );

      if (!durationMilliseconds) {
        await interaction.editReply({
          content: `${duration}${durationUnit} is not a valid duration.`
        });
        return;
      }

      if (durationMilliseconds > 2419200000) {
        await interaction.editReply({
          content: "You cannot mute someone for longer than a month."
        });
        return;
      }

      if (target.id === member.user.id) {
        await interaction.editReply("You cannot mute yourself.");
        return;
      }
      if (target.id === CamperChan.user?.id) {
        await interaction.editReply("You cannot mute the CamperChan.");
        return;
      }

      const targetMember = await guild.members
        .fetch(target.id)
        .catch(() => null);

      if (!targetMember) {
        await interaction.editReply("They don't seem to be in this server.");
        return;
      }

      const sentNotice = await sendModerationDm(
        CamperChan,
        "mute",
        target,
        guild.name,
        reason
      );

      await targetMember.timeout(durationMilliseconds, reason);

      await updateHistory(CamperChan, "mute", target.id);

      const muteEmbed = new EmbedBuilder();
      muteEmbed.setTitle("A user has been muted!");
      muteEmbed.setDescription(`They were muted by ${member.user.username}`);
      muteEmbed.addFields(
        {
          name: "Reason",
          value: customSubstring(reason, 1000)
        },
        {
          name: "Duration",
          value: `${duration} ${durationUnit}`
        },
        {
          name: "User Notified?",
          value: String(sentNotice)
        }
      );
      muteEmbed.setTimestamp();
      muteEmbed.setAuthor({
        name: target.tag,
        iconURL: target.displayAvatarURL()
      });
      muteEmbed.setFooter({
        text: `ID: ${target.id}`
      });

      await CamperChan.config.modHook.send({ embeds: [muteEmbed] });

      await interaction.editReply({
        content: "They have been muted!"
      });
    } catch (err) {
      await errorHandler(CamperChan, "mute subcommand", err);
      await interaction.editReply("Something went wrong.");
    }
  }
};

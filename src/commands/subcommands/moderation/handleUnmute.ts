import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand.js";
import { sendModerationDm } from "../../../modules/sendModerationDm.js";
import { updateHistory } from "../../../modules/updateHistory.js";
import { customSubstring } from "../../../utils/customSubstring.js";
import { errorHandler } from "../../../utils/errorHandler.js";

export const handleUnmute: Subcommand = {
  permissionValidator: (member) =>
    member.permissions.has(PermissionFlagsBits.ModerateMembers),
  execute: async (CamperChan, interaction) => {
    try {
      await interaction.deferReply();
      const { guild, member } = interaction;
      const target = interaction.options.getUser("target", true);
      const reason = interaction.options.getString("reason", true);

      if (target.id === member.user.id) {
        await interaction.editReply("You cannot unmute yourself.");
        return;
      }
      if (target.id === CamperChan.user?.id) {
        await interaction.editReply("You cannot unmute the CamperChan.");
        return;
      }

      const targetMember = await guild.members
        .fetch(target.id)
        .catch(() => null);

      if (!targetMember) {
        await interaction.editReply("They do not seem to be in the server.");
        return;
      }

      await targetMember.timeout(null, reason);

      await updateHistory(CamperChan, "unmute", target.id);

      const sentNotice = await sendModerationDm(
        CamperChan,
        "unmute",
        target,
        guild.name,
        reason
      );

      const muteEmbed = new EmbedBuilder();
      muteEmbed.setTitle("A user is no longer silenced!");
      muteEmbed.setDescription(`They were unmuted by ${member.user.username}`);
      muteEmbed.addFields(
        {
          name: "Reason",
          value: customSubstring(reason, 1000)
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
        content: "That user has been unmuted."
      });
    } catch (err) {
      await errorHandler(CamperChan, "unmute subcommand", err);
      await interaction.editReply("Something went wrong!");
    }
  }
};

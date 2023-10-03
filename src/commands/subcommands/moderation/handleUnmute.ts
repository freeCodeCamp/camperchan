import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand";
import { sendModerationDm } from "../../../modules/sendModerationDm";
import { updateHistory } from "../../../modules/updateHistory";
import { customSubstring } from "../../../utils/customSubstring";
import { errorHandler } from "../../../utils/errorHandler";

export const handleUnmute: Subcommand = {
  permissionValidator: (member) =>
    member.permissions.has(PermissionFlagsBits.ModerateMembers),
  execute: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const { guild, member } = interaction;
      const target = interaction.options.getUser("target", true);
      const reason = interaction.options.getString("reason", true);

      if (target.id === member.user.id) {
        await interaction.editReply("You cannot unmute yourself.");
        return;
      }
      if (target.id === Bot.user?.id) {
        await interaction.editReply("You cannot unmute the bot.");
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

      await updateHistory(Bot, "unmute", target.id);

      const sentNotice = await sendModerationDm(
        Bot,
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
          value: customSubstring(reason, 1000),
        },
        {
          name: "User Notified?",
          value: String(sentNotice),
        }
      );
      muteEmbed.setTimestamp();
      muteEmbed.setAuthor({
        name: target.tag,
        iconURL: target.displayAvatarURL(),
      });
      muteEmbed.setFooter({
        text: `ID: ${target.id}`,
      });

      await Bot.config.mod_hook.send({ embeds: [muteEmbed] });

      await interaction.editReply({
        content: "That user has been unmuted.",
      });
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply("Something went wrong!");
    }
  },
};

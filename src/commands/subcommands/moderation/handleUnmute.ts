import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { sendModerationDm } from "../../../modules/sendModerationDm.js";
import { updateHistory } from "../../../modules/updateHistory.js";
import { customSubstring } from "../../../utils/customSubstring.js";
import { errorHandler } from "../../../utils/errorHandler.js";
import type { Subcommand } from "../../../interfaces/subcommand.js";

export const handleUnmute: Subcommand = {
  execute: async(camperChan, interaction) => {
    try {
      await interaction.deferReply();
      const { guild, member, options } = interaction;
      const target = options.getUser("target", true);
      const reason = options.getString("reason", true);

      if (target.id === member.user.id) {
        await interaction.editReply("You cannot unmute yourself.");
        return;
      }
      if (target.id === camperChan.user?.id) {
        await interaction.editReply("You cannot unmute the camperChan.");
        return;
      }

      const targetMember = await guild.members.
        fetch(target.id).
        catch(() => {
          return null;
        });

      if (!targetMember) {
        await interaction.editReply("They do not seem to be in the server.");
        return;
      }

      await targetMember.timeout(null, reason);

      await updateHistory(camperChan, "unmute", target.id);

      const sentNotice = await sendModerationDm(
        camperChan,
        {
          action:    "unmute",
          guildName: guild.name,
          reason:    customSubstring(reason, 1000),
          user:      target,
        },
      );

      const muteEmbed = new EmbedBuilder();
      muteEmbed.setTitle("A user is no longer silenced!");
      muteEmbed.setDescription(`They were unmuted by ${member.user.username}`);
      muteEmbed.addFields(
        {
          name:  "Reason",
          value: customSubstring(reason, 1000),
        },
        {
          name:  "User Notified?",
          value: String(sentNotice),
        },
      );
      muteEmbed.setTimestamp();
      muteEmbed.setAuthor({
        iconURL: target.displayAvatarURL(),
        name:    target.tag,
      });
      muteEmbed.setFooter({
        text: `ID: ${target.id}`,
      });

      await camperChan.config.modHook.send({ embeds: [ muteEmbed ] });

      await interaction.editReply({
        content: "That user has been unmuted.",
      });
    } catch (error) {
      await errorHandler(camperChan, "unmute subcommand", error);
      await interaction.editReply("Something went wrong!");
    }
  },
  permissionValidator: (member) => {
    return member.permissions.has(PermissionFlagsBits.ModerateMembers);
  },
};

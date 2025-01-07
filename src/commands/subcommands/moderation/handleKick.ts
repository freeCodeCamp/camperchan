import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { sendModerationDm } from "../../../modules/sendModerationDm.js";
import { updateHistory } from "../../../modules/updateHistory.js";
import { customSubstring } from "../../../utils/customSubstring.js";
import { errorHandler } from "../../../utils/errorHandler.js";
import type { Subcommand } from "../../../interfaces/subcommand.js";

export const handleKick: Subcommand = {
  execute: async(camperChan, interaction) => {
    try {
      await interaction.deferReply();
      const { guild, member, options } = interaction;
      const target = options.getUser("target", true);
      const reason = options.getString("reason", true);

      if (target.id === member.user.id) {
        await interaction.editReply("You cannot kick yourself.");
        return;
      }
      if (target.id === camperChan.user?.id) {
        await interaction.editReply("You cannot kick the camperChan.");
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

      if (!targetMember.kickable) {
        await interaction.editReply("I cannot kick them.");
        return;
      }

      const sentNotice = await sendModerationDm(
        camperChan,
        {
          action:    "kick",
          guildName: guild.name,
          reason:    customSubstring(reason, 1000),
          user:      target,
        },
      );

      await targetMember.kick(customSubstring(reason, 1000));

      await updateHistory(camperChan, "kick", target.id);

      const kickLogEmbed = new EmbedBuilder();
      kickLogEmbed.setTitle("Member kicked.");
      kickLogEmbed.setDescription(
        `Member removal was requested by ${member.user.username}`,
      );
      kickLogEmbed.addFields(
        {
          name:  "Reason",
          value: customSubstring(reason, 1000),
        },
        {
          name:  "User notified?",
          value: String(sentNotice),
        },
      );
      kickLogEmbed.setTimestamp();
      kickLogEmbed.setAuthor({
        iconURL: target.displayAvatarURL(),
        name:    target.tag,
      });
      kickLogEmbed.setFooter({
        text: `ID: ${target.id}`,
      });

      await camperChan.config.modHook.send({ embeds: [ kickLogEmbed ] });
      await interaction.editReply({ content: "They have been kicked." });
    } catch (error) {
      await errorHandler(camperChan, "kick subcommand", error);
      await interaction.editReply("Something went wrong.");
    }
  },
  permissionValidator: (member) => {
    return member.permissions.has(PermissionFlagsBits.KickMembers);
  },
};

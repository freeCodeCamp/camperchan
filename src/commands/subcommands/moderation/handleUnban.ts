import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand";
import { updateHistory } from "../../../modules/updateHistory";
import { customSubstring } from "../../../utils/customSubstring";
import { errorHandler } from "../../../utils/errorHandler";

export const handleUnban: Subcommand = {
  permissionValidator: (member) =>
    member.permissions.has(PermissionFlagsBits.BanMembers),
  execute: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const { guild, member } = interaction;
      const target = interaction.options.getUser("target", true);
      const reason = interaction.options.getString("reason", true);

      if (target.id === member.user.id) {
        await interaction.editReply("You cannot unban yourself.");
        return;
      }
      if (target.id === Bot.user?.id) {
        await interaction.editReply("You cannot unban the bot.");
        return;
      }

      const targetBan = await guild.bans.fetch(target.id).catch(() => null);

      if (!targetBan) {
        await interaction.editReply("That user does not appear to be banned.");
        return;
      }

      await guild.bans.remove(target.id);

      await updateHistory(Bot, "unban", target.id);

      const banLogEmbed = new EmbedBuilder();
      banLogEmbed.setTitle("Member unban.");
      banLogEmbed.setDescription(
        `Member unban was requested by ${member.user.username}`
      );
      banLogEmbed.addFields([
        {
          name: "Reason",
          value: customSubstring(reason, 1000)
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

      await Bot.config.modHook.send({ embeds: [banLogEmbed] });
      await interaction.editReply({
        content: "They have been unbanned."
      });
    } catch (err) {
      await errorHandler(Bot, "unban subcommand", err);
      await interaction.editReply("Something went wrong.");
    }
  }
};

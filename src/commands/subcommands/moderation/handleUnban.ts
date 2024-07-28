import { EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { updateHistory } from "../../../modules/updateHistory.js";
import { customSubstring } from "../../../utils/customSubstring.js";
import { errorHandler } from "../../../utils/errorHandler.js";
import type { Subcommand } from "../../../interfaces/subcommand.js";

export const handleUnban: Subcommand = {
  execute: async(camperChan, interaction) => {
    try {
      await interaction.deferReply();
      const { guild, member, options } = interaction;
      const target = options.getUser("target", true);
      const reason = options.getString("reason", true);

      if (target.id === member.user.id) {
        await interaction.editReply("You cannot unban yourself.");
        return;
      }
      if (target.id === camperChan.user?.id) {
        await interaction.editReply("You cannot unban the camperChan.");
        return;
      }

      const targetBan = await guild.bans.fetch(target.id).catch(() => {
        return null;
      });

      if (!targetBan) {
        await interaction.editReply("That user does not appear to be banned.");
        return;
      }

      await guild.bans.remove(target.id);

      await updateHistory(camperChan, "unban", target.id);

      const banLogEmbed = new EmbedBuilder();
      banLogEmbed.setTitle("Member unban.");
      banLogEmbed.setDescription(
        `Member unban was requested by ${member.user.username}`,
      );
      banLogEmbed.addFields([
        {
          name:  "Reason",
          value: customSubstring(reason, 1000),
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
        content: "They have been unbanned.",
      });
    } catch (error) {
      await errorHandler(camperChan, "unban subcommand", error);
      await interaction.editReply("Something went wrong.");
    }
  },
  permissionValidator: (member) => {
    return member.permissions.has(PermissionFlagsBits.BanMembers);
  },
};

import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, PermissionFlagsBits } from "discord.js";

import { Command } from "../interfaces/Command";
import { updateHistory } from "../modules/updateHistory";
import { customSubstring } from "../utils/customSubstring";
import { errorHandler } from "../utils/errorHandler";

export const unban: Command = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Remove's a user's ban.")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The user to unban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for unbanning the user.")
        .setRequired(true)
    ),
  run: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const { guild, member } = interaction;
      const target = interaction.options.getUser("target", true);
      const reason = interaction.options.getString("reason", true);

      if (!guild) {
        await interaction.editReply(
          "This command can only be used in a guild."
        );
        return;
      }

      if (
        !member ||
        typeof member.permissions === "string" ||
        !member.permissions.has(PermissionFlagsBits.BanMembers)
      ) {
        await interaction.editReply(
          "You do not have permission to use this command."
        );
        return;
      }

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
          value: customSubstring(reason, 1000),
        },
      ]);
      banLogEmbed.setTimestamp();
      banLogEmbed.setAuthor({
        name: target.tag,
        iconURL: target.displayAvatarURL(),
      });

      await Bot.config.mod_hook.send({ embeds: [banLogEmbed] });
      await interaction.editReply({
        content: "They have been unbanned.",
      });
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply("Something went wrong.");
    }
  },
};

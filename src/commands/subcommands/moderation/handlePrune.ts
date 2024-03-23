import { ChannelType, PermissionFlagsBits } from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand";
import { errorHandler } from "../../../utils/errorHandler";

export const handlePrune: Subcommand = {
  permissionValidator: (member) =>
    [PermissionFlagsBits.ManageMessages].some((p) => member.permissions.has(p)),
  execute: async (Bot, interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });
      const { channel } = interaction;
      if (!channel || channel.type !== ChannelType.GuildText) {
        await interaction.editReply({
          content: "Must be done in a text channel."
        });
        return;
      }
      const count = interaction.options.getInteger("count", true);
      const messages = await channel.messages.fetch({ limit: count });
      for (const msg of messages.values()) {
        await msg.delete().catch(() => null);
      }
      await interaction.editReply({ content: `Deleted ${count} messages.` });
    } catch (err) {
      await errorHandler(Bot, "prune subcommand", err);
      await interaction.editReply("Something went wrong.");
    }
  }
};

import { ChannelType, PermissionFlagsBits } from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand.js";
import { errorHandler } from "../../../utils/errorHandler.js";

export const handlePrune: Subcommand = {
  permissionValidator: (member) =>
    [PermissionFlagsBits.ManageMessages].some((p) => member.permissions.has(p)),
  execute: async (CamperChan, interaction) => {
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
      await errorHandler(CamperChan, "prune subcommand", err);
      await interaction.editReply("Something went wrong.");
    }
  }
};

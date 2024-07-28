import { ChannelType, PermissionFlagsBits } from "discord.js";
import { errorHandler } from "../../../utils/errorHandler.js";
import type { Subcommand } from "../../../interfaces/subcommand.js";

export const handlePrune: Subcommand = {
  execute: async(camperChan, interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });
      const { channel, options } = interaction;
      if (!channel || channel.type !== ChannelType.GuildText) {
        await interaction.editReply({
          content: "Must be done in a text channel.",
        });
        return;
      }
      const count = options.getInteger("count", true);
      const messages = await channel.messages.fetch({ limit: count });
      await Promise.all(messages.mapValues(async(value) => {
        return await value.delete().catch(() => {
          return null;
        });
      }));
      await interaction.editReply({ content: `Deleted ${String(count)} messages.` });
    } catch (error) {
      await errorHandler(camperChan, "prune subcommand", error);
      await interaction.editReply("Something went wrong.");
    }
  },
  permissionValidator: (member) => {
    return [ PermissionFlagsBits.ManageMessages ].some((p) => {
      return member.permissions.has(p);
    });
  },
};

import { Subcommand } from "../../../interfaces/Subcommand";
import { errorHandler } from "../../../utils/errorHandler";

export const handleProfile: Subcommand = {
  permissionValidator: () => true,
  execute: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const { user } = interaction;

      const target = interaction.options.getUser("target")?.id || user.id;

      const record = await Bot.db.levels.findUnique({
        where: {
          userId: target
        }
      });

      if (!record) {
        await interaction.editReply({
          content: "Error loading that database record."
        });
        return;
      }

      await interaction.editReply({ content: JSON.stringify(record, null, 2) });
    } catch (err) {
      await errorHandler(Bot, err);
    }
  }
};

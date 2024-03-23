import { Subcommand } from "../../../interfaces/Subcommand";
import { generateProfileImage } from "../../../modules/generateProfileImage";
import { errorHandler } from "../../../utils/errorHandler";

export const handleProfile: Subcommand = {
  permissionValidator: () => true,
  execute: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const { user } = interaction;

      const target = user.id;

      const record = await Bot.db.levels.findUnique({
        where: {
          userId: target
        }
      });

      if (!record) {
        await interaction.editReply({
          content: "Error loading your database record."
        });
        return;
      }

      const file = await generateProfileImage(Bot, record);

      if (!file) {
        await interaction.editReply({
          content: "There was an error generating your profile. :c"
        });
        return;
      }

      await interaction.editReply({ files: [file] });
    } catch (err) {
      await errorHandler(Bot, "profile subcommand", err);
    }
  }
};

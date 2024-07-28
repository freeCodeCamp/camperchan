import { generateProfileImage } from "../../../modules/generateProfileImage.js";
import { errorHandler } from "../../../utils/errorHandler.js";
import type { Subcommand } from "../../../interfaces/subcommand.js";

export const handleProfile: Subcommand = {
  execute: async(camperChan, interaction) => {
    try {
      await interaction.deferReply();
      const { user } = interaction;

      const target = user.id;

      const record = await camperChan.db.levels.findUnique({
        where: {
          userId: target,
        },
      });

      if (!record) {
        await interaction.editReply({
          content: "Error loading your database record.",
        });
        return;
      }

      const file = await generateProfileImage(camperChan, record);

      if (!file) {
        await interaction.editReply({
          content: "There was an error generating your profile. :c",
        });
        return;
      }

      await interaction.editReply({
        content: `You can edit your profile card in your </user-settings:1214364031012442163>~!`,
        files:   [ file ],
      });
    } catch (error) {
      await errorHandler(camperChan, "profile subcommand", error);
    }
  },
  permissionValidator: () => {
    return true;
  },
};

import { Subcommand } from "../../../interfaces/Subcommand";
import { generateProfileImage } from "../../../modules/generateProfileImage";
import { errorHandler } from "../../../utils/errorHandler";

export const handleProfile: Subcommand = {
  permissionValidator: () => true,
  execute: async (CamperChan, interaction) => {
    try {
      await interaction.deferReply();
      const { user } = interaction;

      const target = user.id;

      const record = await CamperChan.db.levels.findUnique({
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

      const file = await generateProfileImage(CamperChan, record);

      if (!file) {
        await interaction.editReply({
          content: "There was an error generating your profile. :c"
        });
        return;
      }

      await interaction.editReply({
        content: `You can edit your profile card in your </user-settings:1214364031012442163>~!`,
        files: [file]
      });
    } catch (err) {
      await errorHandler(CamperChan, "profile subcommand", err);
    }
  }
};

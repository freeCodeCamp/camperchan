import { Subcommand } from "../../../interfaces/Subcommand";
import { generateProfileImage } from "../../../modules/generateProfileImage";
import { errorHandler } from "../../../utils/errorHandler";

export const handleProfile: Subcommand = {
  permissionValidator: () => true,
  execute: async (Bot, interaction) => {
    try {
      await interaction.deferReply();
      const { user } = interaction;

      const lastCall = Bot.profileCalls[user.id];

      if (lastCall && lastCall < Date.now() + 1000 * 60 * 60) {
        await interaction.editReply({
          content: `You are calling this command too often. Please try again <t:${Math.floor((lastCall + 1000 * 60 * 60) / 1000)}:R>`
        });
        return;
      }

      delete Bot.profileCalls[user.id];

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

      const file = await generateProfileImage(Bot, record);

      if (!file) {
        await interaction.editReply({
          content: "There was an error generating your profile. :c"
        });
        return;
      }

      await interaction.editReply({ files: [file] });
      if (!Bot.profileCalls[user.id]) {
        Bot.profileCalls[user.id] = Date.now();
      }
    } catch (err) {
      await errorHandler(Bot, err);
    }
  }
};

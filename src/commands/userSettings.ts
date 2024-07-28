import { SlashCommandBuilder } from "discord.js";
import {
  validateColour,
  validateImage,
} from "../modules/settingsValidation.js";
import { errorHandler } from "../utils/errorHandler.js";
import { fetchLearnRecord } from "../utils/fetchLearnRecord.js";
import type { Command } from "../interfaces/command.js";

export const userSettings: Command = {
  data: new SlashCommandBuilder().
    setName("user-settings").
    setDescription("Settings for your camperChan profile").
    setDMPermission(false).
    addStringOption((option) => {
      return option.
        setName("avatar").
        setDescription(
          `The avatar to appear on your profile card must be a URL that points to an image.`,
        );
    }).
    addStringOption((option) => {
      return option.
        setName("background-colour").
        setDescription(
          `The semi-transparent background color for your profile card must be a 6-digit hex value.`,
        );
    }).
    addStringOption((option) => {
      return option.
        setName("background-image").
        setDescription(
          `The background image for your profile card must be a URL that points to an image.`,
        );
    }).
    addStringOption((option) => {
      return option.
        setName("colour").
        setDescription(
          `The color for the text on your profile card must be a 6-digit hex value.`,
        );
    }).
    addStringOption((option) => {
      return option.
        setName("email").
        setDescription(
          "The email associated with your freeCodeCamp.org account.",
        );
    }).
    addBooleanOption((option) => {
      return option.
        setName("level-alerts").
        setDescription("Set if you are notified every time you gain a level");
    }),
  run: async(camperChan, interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });

      const responses = [ "Your profile settings have been updated!" ];
      const options = {
        avatar:           interaction.options.getString("avatar"),
        backgroundColour: interaction.options.getString("background-colour"),
        backgroundImage:  interaction.options.getString("background-image"),
        colour:           interaction.options.getString("colour"),
        learnEmail:       interaction.options.getString("email"),
        levelAlerts:      interaction.options.getBoolean("level-alerts"),
      };
      const badges: Array<string> = [];
      const record = await camperChan.db.levels.findUnique({
        where: { userId: interaction.user.id },
      });
      if (options.learnEmail !== null) {
        if (record?.learnEmail !== undefined) {
          responses.push(
            `You already have an account connected. To reset this, reach out to Naomi.`,
          );
          options.learnEmail = "";
        }
        if (options.learnEmail !== "") {
          const alreadyUsed = await camperChan.db.levels.findFirst({
            where: { learnEmail: options.learnEmail },
          });
          if (alreadyUsed) {
            responses.push(
              `${options.learnEmail} is already connected to a Discord account.`,
            );
            options.learnEmail = "";
          }
        }

        if (options.learnEmail !== "") {
          const learnRecord = await fetchLearnRecord(
            camperChan,
            options.learnEmail,
            interaction.user.id,
          );
          if (!learnRecord) {
            responses.push(
              `${options.learnEmail} is not associated with a freeCodeCamp.org account.`,
            );
            options.learnEmail = "";
          }
        }
        if (options.learnEmail !== "") {
          responses.push(
            `Your freeCodeCamp.org account has been connected successfully.`,
          );
          badges.push("Linked Account");
        }
      }
      if (options.avatar !== null) {
        const isValid = await validateImage(options.avatar);
        if (!isValid) {
          responses.push(`${options.avatar} is not a valid image URL.`);
          options.avatar = "";
        }
      }
      if (options.backgroundImage !== null) {
        const isValid = await validateImage(options.backgroundImage);
        if (!isValid) {
          responses.push(`${options.backgroundImage} is not a valid image URL.`);
          options.backgroundImage = "";
        }
      }
      if (options.colour !== null) {
        if (options.colour.startsWith("#")) {
          options.colour = options.colour.slice(1);
        }
        if (!validateColour(options.colour)) {
          options.colour = null;
          responses.push(
            `${String(interaction.options.getString("colour"))} is not a valid hex code. Please try again with a 6 character hex code (# is optional).`,
          );
        }
      }
      if (options.backgroundColour !== null) {
        if (options.backgroundColour.startsWith("#")) {
          options.backgroundColour = options.backgroundColour.slice(1);
        }
        if (!validateColour(options.backgroundColour)) {
          options.backgroundColour = null;
          responses.push(
            `${String(interaction.options.getString("background-colour"))} is not a valid hex code. Please try again with a 6 character hex code (# is optional).`,
          );
        }
      }

      const query = Object.fromEntries(
        Object.entries(options).filter(([ , value ]) => {
          return value !== null;
        }),
      );

      await camperChan.db.levels.upsert({
        create: {
          userId:  interaction.user.id,
          userTag: interaction.user.username,
          ...query,
          badges:  badges,
        },
        update: {
          ...query,
          badges: {
            push: badges,
          },
        },
        where: {
          userId: interaction.user.id,
        },
      });

      await interaction.editReply({ content: responses.join("\n") });
    } catch (error) {
      await errorHandler(camperChan, "user settings command", error);
    }
  },
};

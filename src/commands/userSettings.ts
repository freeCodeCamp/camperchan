import { SlashCommandBuilder } from "discord.js";

import { Command } from "../interfaces/Command";
import { validateColour, validateImage } from "../modules/settingsValidation";
import { errorHandler } from "../utils/errorHandler";
import { fetchLearnRecord } from "../utils/fetchLearnRecord";

export const userSettings: Command = {
  data: new SlashCommandBuilder()
    .setName("user-settings")
    .setDescription("Settings for your CamperChan profile")
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("avatar")
        .setDescription(
          "The avatar to appear on your profile card must be a URL that points to an image."
        )
    )
    .addStringOption((option) =>
      option
        .setName("background-colour")
        .setDescription(
          "The semi-transparent background color for your profile card must be a 6-digit hex value."
        )
    )
    .addStringOption((option) =>
      option
        .setName("background-image")
        .setDescription(
          "The background image for your profile card must be a URL that points to an image."
        )
    )
    .addStringOption((option) =>
      option
        .setName("colour")
        .setDescription(
          "The color for the text on your profile card must be a 6-digit hex value."
        )
    )
    .addStringOption((option) =>
      option
        .setName("email")
        .setDescription(
          "The email associated with your freeCodeCamp.org account."
        )
    )
    .addBooleanOption((option) =>
      option
        .setName("level-alerts")
        .setDescription("Set if you notified every time you gain a level")
    ),
  run: async (CamperChan, interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });

      const responses = ["Your profile settings have been updated!"];
      const opts = {
        avatar: interaction.options.getString("avatar"),
        backgroundColour: interaction.options.getString("background-colour"),
        backgroundImage: interaction.options.getString("background-image"),
        colour: interaction.options.getString("colour"),
        learnEmail: interaction.options.getString("email"),
        levelAlerts: interaction.options.getBoolean("level-alerts")
      };
      const badges: string[] = [];
      const record = await CamperChan.db.levels.findUnique({
        where: { userId: interaction.user.id }
      });
      if (opts.learnEmail) {
        if (record?.learnEmail) {
          responses.push(
            "You already have an account connected. To reset this, reach out to Naomi."
          );
          opts.learnEmail = "";
        }
        if (opts.learnEmail) {
          const alreadyUsed = await CamperChan.db.levels.findFirst({
            where: { learnEmail: opts.learnEmail }
          });
          if (alreadyUsed) {
            responses.push(
              `${opts.learnEmail} is already connected to a Discord account.`
            );
            opts.learnEmail = "";
          }
        }

        if (opts.learnEmail) {
          const record = await fetchLearnRecord(
            CamperChan,
            opts.learnEmail,
            interaction.user.id
          );
          if (!record) {
            responses.push(
              `${opts.learnEmail} is not associated with a freeCodeCamp.org account.`
            );
            opts.learnEmail = "";
          }
        }
        if (opts.learnEmail) {
          responses.push(
            `Your freeCodeCamp.org account has been connected successfully.`
          );
          badges.push("Linked Account");
        }
      }
      if (opts.avatar) {
        const isValid = await validateImage(opts.avatar);
        if (!isValid) {
          responses.push(`${opts.avatar} is not a valid image URL.`);
          opts.avatar = "";
        }
      }
      if (opts.backgroundImage) {
        const isValid = await validateImage(opts.backgroundImage);
        if (!isValid) {
          responses.push(`${opts.backgroundImage} is not a valid image URL.`);
          opts.backgroundImage = "";
        }
      }
      if (opts.colour) {
        if (opts.colour.startsWith("#")) {
          opts.colour = opts.colour.slice(1);
        }
        if (!validateColour(opts.colour)) {
          opts.colour = null;
          responses.push(
            `${interaction.options.getString("colour")} is not a valid hex code. Please try again with a 6 character hex code (# is optional).`
          );
        }
      }
      if (opts.backgroundColour) {
        if (opts.backgroundColour.startsWith("#")) {
          opts.backgroundColour = opts.backgroundColour.slice(1);
        }
        if (!validateColour(opts.backgroundColour)) {
          opts.backgroundColour = null;
          responses.push(
            `${interaction.options.getString("background-colour")} is not a valid hex code. Please try again with a 6 character hex code (# is optional).`
          );
        }
      }

      const query = (
        Object.entries(opts) as [keyof typeof opts, string][]
      ).reduce(
        (acc, [key, val]) => {
          if (val) {
            acc[key] = val;
          }
          return acc;
        },
        {} as Record<keyof typeof opts, string>
      );

      await CamperChan.db.levels.upsert({
        where: {
          userId: interaction.user.id
        },
        update: {
          ...query,
          badges: {
            push: badges
          }
        },
        create: {
          userId: interaction.user.id,
          userTag: interaction.user.username,
          ...query,
          badges
        }
      });

      await interaction.editReply({ content: responses.join("\n") });
    } catch (err) {
      await errorHandler(CamperChan, "user settings command", err);
    }
  }
};

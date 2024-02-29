import { readFile } from "fs/promises";
import { join } from "path";

import { SlashCommandBuilder } from "discord.js";

import { SupporterRoleId } from "../config/Supporter";
import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";
import { fetchLearnRecord } from "../utils/fetchLearnRecord";

export const supporter: Command = {
  data: new SlashCommandBuilder()
    .setName("supporter")
    .setDescription("Claim the supporter role.")
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("email")
        .setDescription("The email tied to your freeCodeCamp account.")
        .setRequired(true)
    ),
  run: async (bot, interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });
      const email = interaction.options.getString("email", true);
      const { member } = interaction;
      if (member.roles.cache.has(SupporterRoleId)) {
        await interaction.editReply({
          content: "You have already claimed the supporter role."
        });
        return;
      }
      const existsByUserId = await bot.db.supporters.findUnique({
        where: {
          userId: member.id
        }
      });
      if (existsByUserId) {
        await interaction.editReply({
          content:
            "A supporter record already exists on your Discord account. If you believe this is an error, please contact Naomi."
        });
        return;
      }
      const existsByEmail = await bot.db.supporters.findUnique({
        where: {
          email
        }
      });
      if (existsByEmail) {
        await interaction.editReply({
          content:
            "A supporter record already exists on your email. If you believe this is an error, please contact Naomi."
        });
        return;
      }
      const learnRecord = await fetchLearnRecord(bot, email);
      if (!learnRecord) {
        await interaction.editReply({
          content: `There does not appear to be a learn account associated with ${email}. If you believe this is an error, please contact Naomi.`
        });
        return;
      }
      if (!learnRecord.isDonating) {
        await interaction.editReply({
          content:
            "You do not appear to be actively supporting freeCodeCamp at this time. If you believe this is an error, please contact Naomi."
        });
        return;
      }
      await bot.db.supporters.create({
        data: {
          userId: member.id,
          email
        }
      });
      await member.roles.add(SupporterRoleId);
      await interaction.editReply({
        content:
          "Congrats! You now have the supporter role, with access to special channels."
      });
      const donorCTA2023 = await readFile(
        join(process.cwd(), process.env.EMAIL_LIST ?? "Naomi messed up."),
        "utf-8"
      );
      const isCTAMember = donorCTA2023.split("\n").includes(email);
      if (isCTAMember) {
        await member.roles.add("1186748788665225336");
      }
    } catch (err) {
      await errorHandler(bot, err);
    }
  }
};

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { InteractionContextType, SlashCommandBuilder } from "discord.js";
import { supporterRoleId } from "../config/roles.js";
import { errorHandler } from "../utils/errorHandler.js";
import { fetchLearnRecord } from "../utils/fetchLearnRecord.js";
import type { Command } from "../interfaces/command.js";

export const supporter: Command = {
  data: new SlashCommandBuilder().
    setName("supporter").
    setDescription("Claim the supporter role.").
    setContexts(InteractionContextType.Guild).
    addStringOption((option) => {
      return option.
        setName("email").
        setDescription("The email tied to your freeCodeCamp account.").
        setRequired(true);
    }),
  run: async(camperChan, interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });
      const email = interaction.options.getString("email", true);
      const { member, user } = interaction;
      if (member.roles.cache.has(supporterRoleId)) {
        await interaction.editReply({
          content: "You have already claimed the supporter role.",
        });
        return;
      }
      const existsByUserId = await camperChan.db.supporters.findUnique({
        where: {
          userId: member.id,
        },
      });
      if (existsByUserId) {
        await interaction.editReply({
          content:
            `A supporter record already exists on your Discord account. If you believe this is an error, please contact Naomi.`,
        });
        return;
      }
      const existsByEmail = await camperChan.db.supporters.findUnique({
        where: {
          email,
        },
      });
      if (existsByEmail) {
        await interaction.editReply({
          content:
            `A supporter record already exists on your email. If you believe this is an error, please contact Naomi.`,
        });
        return;
      }
      const learnRecord = await fetchLearnRecord(
        camperChan,
        email,
        user.id,
      );
      if (!learnRecord) {
        await interaction.editReply({
          content: `There does not appear to be a learn account associated with ${email}. If you believe this is an error, please contact Naomi.`,
        });
        return;
      }
      if (learnRecord.isDonating !== true) {
        await interaction.editReply({
          content:
            `You do not appear to be actively supporting freeCodeCamp at this time. If you believe this is an error, please contact Naomi.`,
        });
        return;
      }
      await camperChan.db.supporters.create({
        data: {
          email:  email,
          userId: member.id,
        },
      });
      await member.roles.add(supporterRoleId).catch(async() => {
        await camperChan.config.debugHook.send(
          `Failed to assign Supporter role to ${member.id}. Please assign manually.`,
        );
      });
      await interaction.editReply({
        content:
          `Congrats! You now have the supporter role, with access to special channels.`,
      });
      const donorCTA2023 = await readFile(
        join(process.cwd(), process.env.EMAIL_LIST ?? "Naomi messed up."),
        "utf-8",
      );
      const isCTAMember = donorCTA2023.split("\n").includes(email);
      if (isCTAMember) {
        await member.roles.add("1186748788665225336").catch(async() => {
          await camperChan.config.debugHook.send(
            `Failed to assign CTA role to ${member.id}. Please assign manually.`,
          );
        });
      }
    } catch (error) {
      await errorHandler(camperChan, "supporter command", error);
    }
  },
};

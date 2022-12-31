import {
  ActionRowBuilder,
  ButtonBuilder,
  SlashCommandBuilder,
} from "@discordjs/builders";
import { ButtonStyle, ComponentType, Message } from "discord.js";

import LevelModel from "../database/models/LevelModel";
import { Command } from "../interfaces/Command";
import { errorHandler } from "../utils/errorHandler";
import { formatTextToTable } from "../utils/formatText";

export const leaderboard: Command = {
  data: new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("View the server leaderboard."),
  run: async (Bot, interaction) => {
    try {
      await interaction.deferReply();

      const levels = await LevelModel.find({})
        .sort({ points: "descending" })
        .lean()
        .exec();

      const mappedWithId = levels.map((user, index) => [
        index + 1,
        user.userTag,
        user.level,
        user.points,
        user.userId,
      ]);

      const mapped = levels.map((user, index) => [
        index + 1,
        user.userTag,
        user.level,
        user.points,
      ]);

      const userData = mappedWithId.find((el) => el[4] === interaction.user.id);

      const userRankString = userData
        ? `You are rank ${userData[0]} with ${userData[3]} experience at level ${userData[2]}`
        : "You do not have a rank yet!";

      let page = 1;
      const lastPage = Math.ceil(mapped.length / 10);

      const pageBack = new ButtonBuilder()
        .setCustomId("prev")
        .setDisabled(true)
        .setLabel("◀")
        .setStyle(ButtonStyle.Primary);
      const pageForward = new ButtonBuilder()
        .setCustomId("next")
        .setLabel("▶")
        .setStyle(ButtonStyle.Primary);

      const sent = (await interaction.editReply({
        content: `${userRankString}\n\n\`\`\`\n${formatTextToTable(
          mapped.slice(page * 10 - 10, page * 10),
          { headers: ["Rank", "User", "Level", "XP"] }
        )}\n\`\`\``,
        components: [
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            pageBack,
            pageForward
          ),
        ],
      })) as Message;

      const clickyClick =
        sent.createMessageComponentCollector<ComponentType.Button>({
          time: 300000,
          filter: (click) => click.user.id === interaction.user.id,
        });

      clickyClick.on("collect", async (click) => {
        await click.deferUpdate();
        if (click.customId === "prev") {
          page--;
        }
        if (click.customId === "next") {
          page++;
        }

        if (page <= 1) {
          pageBack.setDisabled(true);
        } else {
          pageBack.setDisabled(false);
        }

        if (page >= lastPage) {
          pageForward.setDisabled(true);
        } else {
          pageForward.setDisabled(false);
        }

        await interaction.editReply({
          content: `${userRankString}\n\n\`\`\`\n${formatTextToTable(
            mapped.slice(page * 10 - 10, page * 10),
            { headers: ["Rank", "User", "Level", "XP"] }
          )}\n\`\`\``,
          components: [
            new ActionRowBuilder<ButtonBuilder>().addComponents(
              pageBack,
              pageForward
            ),
          ],
        });
      });

      clickyClick.on("end", async () => {
        pageBack.setDisabled(true);
        pageForward.setDisabled(true);
        await interaction.editReply({
          components: [
            new ActionRowBuilder<ButtonBuilder>().addComponents(
              pageBack,
              pageForward
            ),
          ],
        });
      });
    } catch (err) {
      await errorHandler(Bot, err);
      await interaction.editReply({
        content: "Something went wrong! Please try again later.",
      });
    }
  },
};

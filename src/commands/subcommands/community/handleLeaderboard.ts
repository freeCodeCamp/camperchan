import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  Message
} from "discord.js";

import { Subcommand } from "../../../interfaces/Subcommand.js";
import { generateLeaderboardImage } from "../../../modules/generateProfileImage.js";
import { errorHandler } from "../../../utils/errorHandler.js";

export const handleLeaderboard: Subcommand = {
  permissionValidator: () => true,
  execute: async (CamperChan, interaction) => {
    try {
      await interaction.deferReply();

      const levels = await CamperChan.db.levels.findMany({
        orderBy: {
          points: "desc"
        }
      });

      const mapped = levels.map((user, index) => ({
        ...user,
        index: index + 1
      }));

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

      const attachment = await generateLeaderboardImage(
        CamperChan,
        mapped.slice(page * 10 - 10, page * 10)
      );

      if (!attachment) {
        await interaction.editReply({
          content: "Failed to load leaderboard image.",
          files: [],
          components: []
        });
        return;
      }

      const sent = (await interaction.editReply({
        content: `You can edit your leaderboard card in your </user-settings:1214364031012442163>~!`,
        files: [attachment],
        components: [
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            pageBack,
            pageForward
          )
        ]
      })) as Message;

      const clickyClick =
        sent.createMessageComponentCollector<ComponentType.Button>({
          time: 300000,
          filter: (click) => click.user.id === interaction.user.id
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

        const attachment = await generateLeaderboardImage(
          CamperChan,
          mapped.slice(page * 10 - 10, page * 10)
        );

        if (!attachment) {
          await interaction.editReply({
            content: "Failed to load leaderboard image.",
            files: [],
            components: []
          });
          return;
        }

        await interaction.editReply({
          files: [attachment],
          components: [
            new ActionRowBuilder<ButtonBuilder>().addComponents(
              pageBack,
              pageForward
            )
          ]
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
            )
          ]
        });
      });
    } catch (err) {
      await errorHandler(CamperChan, "leaderboard subcommand", err);
      await interaction.editReply({
        content: "Something went wrong! Please try again later."
      });
    }
  }
};

import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  type ButtonInteraction,
  type ChatInputCommandInteraction,
  type ComponentType,
} from "discord.js";
import { generateLeaderboardImage }
  from "../../../modules/generateProfileImage.js";
import { errorHandler } from "../../../utils/errorHandler.js";
import type { ExtendedClient } from "../../../interfaces/extendedClient.js";
import type { Subcommand } from "../../../interfaces/subcommand.js";
import type { levels } from "@prisma/client";

const handleClickEnd = async(
  pageBack: ButtonBuilder,
  pageForward: ButtonBuilder,
  interaction: ChatInputCommandInteraction,
): Promise<void> => {
  pageBack.setDisabled(true);
  pageForward.setDisabled(true);
  await interaction.editReply({
    components: [
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        pageBack,
        pageForward,
      ),
    ],
  });
};

const handleClick = async(
  camperChan: ExtendedClient,
  parameters: {
    click:       ButtonInteraction;
    interaction: ChatInputCommandInteraction;
    pageBack:    ButtonBuilder;
    pageForward: ButtonBuilder;
    pagination:  { page: number; lastPage: number; itemsForPage: number };
    mapped:      Array<levels & { index: number }>;
  },
): Promise<void> => {
  const { click, interaction, pageBack, pageForward, pagination, mapped }
    = parameters;
  let { page } = pagination;
  const { lastPage, itemsForPage } = pagination;
  await click.deferUpdate();
  if (click.customId === "prev") {
    page = page - 1;
  }
  if (click.customId === "next") {
    page = page + 1;
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

  const updatedAttachment = await generateLeaderboardImage(
    camperChan,
    mapped.slice(itemsForPage - 10, itemsForPage),
  );

  if (!updatedAttachment) {
    await interaction.editReply({
      components: [],
      content:    "Failed to load leaderboard image.",
      files:      [],
    });
    return;
  }

  await interaction.editReply({
    components: [
      new ActionRowBuilder<ButtonBuilder>().addComponents(
        pageBack,
        pageForward,
      ),
    ],
    files: [ updatedAttachment ],
  });
};

export const handleLeaderboard: Subcommand = {
  execute: async(camperChan, interaction) => {
    try {
      await interaction.deferReply();

      const levels = await camperChan.db.levels.findMany({
        orderBy: {
          points: "desc",
        },
      });

      const mapped = levels.map((user, index) => {
        return {
          ...user,
          index: index + 1,
        };
      });

      const page = 1;
      const lastPage = Math.ceil(mapped.length / 10);

      const pageBack = new ButtonBuilder().
        setCustomId("prev").
        setDisabled(true).
        setLabel("◀").
        setStyle(ButtonStyle.Primary);
      const pageForward = new ButtonBuilder().
        setCustomId("next").
        setLabel("▶").
        setStyle(ButtonStyle.Primary);
      if (page >= lastPage) {
        pageForward.setDisabled(true);
      } else {
        pageForward.setDisabled(false);
      }

      const itemsForPage = page * 10;

      const attachment = await generateLeaderboardImage(
        camperChan,
        mapped.slice(itemsForPage - 10, itemsForPage),
      );

      if (!attachment) {
        await interaction.editReply({
          components: [],
          content:    "Failed to load leaderboard image.",
          files:      [],
        });
        return;
      }

      const sent = await interaction.editReply({
        components: [
          new ActionRowBuilder<ButtonBuilder>().addComponents(
            pageBack,
            pageForward,
          ),
        ],
        content: `You can edit your leaderboard card in your </user-settings:1214364031012442163>~!`,
        files:   [ attachment ],
      });

      const clickyClick
        = sent.createMessageComponentCollector<ComponentType.Button>({
          filter: (click) => {
            return click.user.id === interaction.user.id;
          },
          time: 300_000,
        });

      clickyClick.on("collect", (click) => {
        const pagination = { itemsForPage, lastPage, page };
        void handleClick(camperChan, {
          click,
          interaction,
          mapped,
          pageBack,
          pageForward,
          pagination,
        });
      });

      clickyClick.on("end", () => {
        void handleClickEnd(pageBack, pageForward, interaction);
      });
    } catch (error) {
      await errorHandler(camperChan, "leaderboard subcommand", error);
      await interaction.editReply({
        content: "Something went wrong! Please try again later.",
      });
    }
  },
  permissionValidator: () => {
    return true;
  },
};

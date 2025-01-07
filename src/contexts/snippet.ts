import {
  ActionRowBuilder,
  type ComponentType,
  type ContextMenuCommandInteraction,
  type Message,
  StringSelectMenuBuilder,
  type StringSelectMenuInteraction,
} from "discord.js";
import { tags } from "../config/tags.js";
import { errorHandler } from "../utils/errorHandler.js";
import { isModerator } from "../utils/isModerator.js";
import type { Context } from "../interfaces/context.js";

const handleClickEnd = async(
  interaction: ContextMenuCommandInteraction,
): Promise<void> => {
  await interaction.
    editReply({
      components: [],
    }).

  /**
   * Ephemerals can be dismissed by the user.
   * We catch the error here because we don't really
   * care if it fails.
   */
    catch(() => {
      return null;
    });
};

const handleClick = async(
  selection: StringSelectMenuInteraction,
  interaction: ContextMenuCommandInteraction,
  message: Message,
): Promise<void> => {
  await selection.deferUpdate();
  const name = selection.values.at(0);
  const target = tags.find((t) => {
    return t.name === name;
  });
  if (!target) {
    await selection.editReply({
      content: `Cannot find a snippet with the name ${String(name)}.`,
    });
    return;
  }
  await message.reply({
    content: target.message,
  });
  await interaction.editReply({
    components: [],
    content:    "Response sent!",
  });
};

export const snippet: Context = {
  data: {
    name: "snippet",
    type: 3,
  },
  run: async(camperChan, interaction) => {
    try {
      if (!interaction.isMessageContextMenuCommand()) {
        await interaction.reply({
          content:
            "This command is improperly configured. Please contact Naomi.",
          ephemeral: true,
        });
        return;
      }
      await interaction.deferReply({ ephemeral: true });
      if (!isModerator(interaction.member)) {
        await interaction.editReply({
          content: "Only moderators may use this command.",
        });
        return;
      }
      const message = interaction.options.getMessage("message", true);

      const dropdown = new StringSelectMenuBuilder().
        setCustomId("snippets").
        addOptions(
          ...tags.map(({ name }) => {
            return {
              label: name,
              value: name,
            };
          }),
        ).
        setMaxValues(1).
        setMinValues(1);
      const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
        dropdown,
      );

      const response = await interaction.editReply({
        components: [ row ],
        content:    "Which snippet would you like to send?",
      });

      const collector
        = response.createMessageComponentCollector<ComponentType.StringSelect>({
          time: 1000 * 60 * 60,
        });

      collector.on("collect", (click) => {
        void handleClick(click, interaction, message);
      });

      collector.on("end", () => {
        void handleClickEnd(interaction);
      });
    } catch (error) {
      await errorHandler(camperChan, "snippet context command", error);
    }
  },
};

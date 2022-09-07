import { Interaction, InteractionType, Message } from "discord.js";
import { compareTwoStrings } from "string-similarity";

import { Tags } from "../../config/Tags";
import { Camperbot } from "../../interfaces/Camperbot";
import { closePrivateChannel } from "../../modules/closePrivateChannel";
import { reactionRoleClick } from "../../modules/reactionRoleClick";

/**
 * Handles the interaction events from Discord.
 *
 * @param {Camperbot} Bot The bot's Discord instance.
 * @param {Interaction} interaction The interaction payload from Discord.
 */
export const handleInteractionCreate = async (
  Bot: Camperbot,
  interaction: Interaction
) => {
  if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
    if (interaction.commandName === "tags") {
      const option = interaction.options.getFocused(true);

      if (option.name === "name") {
        const tagNames = Tags.map((tag) => tag.name);
        for (const tag of Tags) {
          tagNames.push(...tag.aliases);
        }
        const search = option.value.toLowerCase();
        const choices = tagNames
          .sort((a, b) =>
            compareTwoStrings(b, search) > compareTwoStrings(a, search) ? 1 : -1
          )
          .slice(0, 5);
        await interaction.respond(
          choices.map((choice) => ({ name: choice, value: choice }))
        );
      }
    }
  }
  if (interaction.isChatInputCommand()) {
    const target = Bot.commands.find(
      (command) => command.data.name === interaction.commandName
    );
    if (!target) {
      await interaction.reply(
        "That does not appear to be a valid slash command..."
      );
      return;
    }
    await target.run(Bot, interaction);
  }

  if (interaction.isContextMenuCommand()) {
    const target = Bot.contexts.find(
      (context) => context.data.name === interaction.commandName
    );
    if (!target) {
      await interaction.reply(
        "That does not appear to be a valid context command..."
      );
      return;
    }
    await target.run(Bot, interaction);
    return;
  }

  if (interaction.isButton()) {
    if (interaction.customId === "delete-bookmark") {
      await (interaction.message as Message).delete();
    }
    if (interaction.customId === "close-channel") {
      await closePrivateChannel(Bot, interaction);
    }
    if (interaction.customId.startsWith("rr-")) {
      await reactionRoleClick(Bot, interaction);
    }
  }
};

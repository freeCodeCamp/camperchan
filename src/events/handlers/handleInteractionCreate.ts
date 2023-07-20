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
    if (interaction.customId === "acknowledge") {
      await interaction.deferUpdate();
      const embed = (interaction.message as Message).embeds[0];
      await interaction.editReply({
        embeds: [
          {
            title: embed.title || "lost it oopsie",
            description: embed.description || "lost it oopsie",
            fields: [
              ...embed.fields,
              {
                name: "Acknowledged by",
                value: `<@!${interaction.user.id}>`,
              },
            ],
          },
        ],
        components: [],
      });
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId.startsWith(`report-`)) {
      const messageId = interaction.customId.split("-")[1];
      const reportChannel = Bot.reportChannel;
      const message = await reportChannel.messages.fetch(messageId);
      const embed = message.embeds[0];
      const reason = interaction.fields.getTextInputValue("reason");
      await message.edit({
        embeds: [
          {
            title: embed.title || "lost it oopsie",
            description: embed.description || "lost it oopsie",
            fields: [
              ...embed.fields,
              {
                name: "Reason",
                value: reason,
              },
            ],
          },
        ],
      });
      await interaction.reply({
        content: "Thank you for reporting!",
        ephemeral: true,
      });
    }
  }
};

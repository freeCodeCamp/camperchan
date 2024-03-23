import { Interaction, Message } from "discord.js";
import { compareTwoStrings } from "string-similarity";

import { Languages } from "../../config/Languages";
import { ExtendedClient } from "../../interfaces/ExtendedClient";
import { closePrivateChannel } from "../../modules/closePrivateChannel";
import { reactionRoleClick } from "../../modules/reactionRoleClick";
import { isGuildCommandInteraction } from "../../utils/typeGuards";

/**
 * Handles the interaction events from Discord.
 *
 * @param {ExtendedClient} CamperChan The CamperChan's Discord instance.
 * @param {Interaction} interaction The interaction payload from Discord.
 */
export const handleInteractionCreate = async (
  CamperChan: ExtendedClient,
  interaction: Interaction
) => {
  if (interaction.isChatInputCommand()) {
    const target = CamperChan.commands.find(
      (command) => command.data.name === interaction.commandName
    );
    if (!target) {
      await interaction.reply(
        "That does not appear to be a valid slash command..."
      );
      return;
    }
    if (!isGuildCommandInteraction(interaction)) {
      await interaction.reply(
        "This command can only be used in a server, not a DM."
      );
      return;
    }
    await target.run(CamperChan, interaction);
  }

  if (interaction.isContextMenuCommand()) {
    const target = CamperChan.contexts.find(
      (context) => context.data.name === interaction.commandName
    );
    if (!target) {
      await interaction.reply(
        "That does not appear to be a valid context command..."
      );
      return;
    }
    await target.run(CamperChan, interaction);
    return;
  }

  if (interaction.isButton()) {
    if (interaction.customId === "delete-bookmark") {
      await (interaction.message as Message).delete();
    }
    if (interaction.customId === "close-channel") {
      await closePrivateChannel(CamperChan, interaction);
    }
    if (interaction.customId.startsWith("rr-")) {
      await reactionRoleClick(CamperChan, interaction);
    }
    if (interaction.customId === "acknowledge") {
      await interaction.deferUpdate();
      const embed = (interaction.message as Message).embeds[0];
      await interaction.editReply({
        embeds: [
          {
            title: embed?.title || "lost it oopsie",
            description: embed?.description || "lost it oopsie",
            fields: [
              ...(embed?.fields ?? []),
              {
                name: "Acknowledged by",
                value: `<@!${interaction.user.id}>`
              }
            ]
          }
        ],
        components: []
      });
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId.startsWith(`report-`)) {
      const messageId = interaction.customId.split("-")[1];
      if (!messageId) {
        await interaction.reply({
          content: "Error loading messgae. Please try again."
        });
        return;
      }
      const reportChannel = CamperChan.reportChannel;
      const message = await reportChannel.messages.fetch(messageId);
      const embed = message.embeds[0];
      const reason = interaction.fields.getTextInputValue("reason");
      await message.edit({
        embeds: [
          {
            title: embed?.title || "lost it oopsie",
            description: embed?.description || "lost it oopsie",
            fields: [
              ...(embed?.fields ?? []),
              {
                name: "Reason",
                value: reason
              }
            ]
          }
        ]
      });
      await interaction.reply({
        content: "Thank you for reporting!",
        ephemeral: true
      });
    }
  }

  if (interaction.isAutocomplete()) {
    if (interaction.commandName === "translator") {
      const input = interaction.options.getString("language", true);
      const similar = Languages.sort(
        (a, b) => compareTwoStrings(b, input) - compareTwoStrings(a, input)
      );
      await interaction.respond(
        similar.slice(0, 5).map((el) => ({ name: el, value: el }))
      );
    }
  }
};

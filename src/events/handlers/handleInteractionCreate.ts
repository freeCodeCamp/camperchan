import { compareTwoStrings } from "string-similarity";
import { languages } from "../../config/languages.js";
import { closePrivateChannel } from "../../modules/closePrivateChannel.js";
import { reactionRoleClick } from "../../modules/reactionRoleClick.js";
import { closeTicket } from "../../modules/tickets/closeTicket.js";
import { openTicket } from "../../modules/tickets/openTicket.js";
import { isGuildCommandInteraction } from "../../utils/typeGuards.js";
import type { ExtendedClient } from "../../interfaces/extendedClient.js";
import type { Interaction } from "discord.js";

/**
 * Handles the interaction events from Discord.
 * @param camperChan - The camperChan's Discord instance.
 * @param interaction - The interaction payload from Discord.
 */
export const handleInteractionCreate = async(
  camperChan: ExtendedClient,
  interaction: Interaction,
): Promise<void> => {
  if (interaction.isChatInputCommand()) {
    const target = camperChan.commands.find(
      (command) => {
        return command.data.name === interaction.commandName;
      },
    );
    if (!target) {
      await interaction.reply(
        "That does not appear to be a valid slash command...",
      );
      return;
    }
    if (!isGuildCommandInteraction(interaction)) {
      await interaction.reply(
        "This command can only be used in a server, not a DM.",
      );
      return;
    }
    await target.run(camperChan, interaction);
  }

  if (interaction.isContextMenuCommand()) {
    const target = camperChan.contexts.find(
      (context) => {
        return context.data.name === interaction.commandName;
      },
    );
    if (!target) {
      await interaction.reply(
        "That does not appear to be a valid context command...",
      );
      return;
    }
    await target.run(camperChan, interaction);
    return;
  }

  if (interaction.isButton()) {
    if (interaction.customId === "ticket-open") {
      if (!interaction.inCachedGuild()) {
        throw new Error("uncached interaction????");
      }
      await openTicket(camperChan, interaction);
    }
    if (interaction.customId === "ticket-close") {
      if (!interaction.inCachedGuild()) {
        throw new Error("uncached interaction????");
      }
      await closeTicket(camperChan, interaction);
    }

    if (interaction.customId === "delete-bookmark") {
      await interaction.message.delete();
    }
    if (interaction.customId === "close-channel") {
      await closePrivateChannel(camperChan, interaction);
    }
    if (interaction.customId.startsWith("rr-")) {
      await reactionRoleClick(camperChan, interaction);
    }
    if (interaction.customId === "acknowledge") {
      await interaction.deferUpdate();
      const [ embed ] = interaction.message.embeds;
      await interaction.editReply({
        components: [],
        embeds:     [
          {
            description: embed?.description ?? "lost it oopsie",
            fields:      [
              ...embed?.fields ?? [],
              {
                name:  "Acknowledged by",
                value: `<@!${interaction.user.id}>`,
              },
            ],
            title: embed?.title ?? "lost it oopsie",
          },
        ],
      });
    }
  }

  if (interaction.isModalSubmit() && interaction.customId.startsWith(`report-`)) {
    const messageId = interaction.customId.split("-").at(1);
    if (messageId === undefined) {
      await interaction.reply({
        content: "Error loading messgae. Please try again.",
      });
      return;
    }
    const { reportChannel } = camperChan;
    const message = await reportChannel.messages.fetch(messageId);
    const [ embed ] = message.embeds;
    const reason = interaction.fields.getTextInputValue("reason");
    await message.edit({
      embeds: [
        {
          description: embed?.description ?? "lost it oopsie",
          fields:      [
            ...embed?.fields ?? [],
            {
              name:  "Reason",
              value: reason,
            },
          ],
          title: embed?.title ?? "lost it oopsie",
        },
      ],
    });
    await interaction.reply({
      content:   "Thank you for reporting!",
      ephemeral: true,
    });
  }

  if (interaction.isAutocomplete()
  && interaction.commandName === "translator") {
    const input = interaction.options.getString("language", true);
    const similar = languages.sort(
      (a, b) => {
        return compareTwoStrings(b, input) - compareTwoStrings(a, input);
      },
    );
    await interaction.respond(
      similar.slice(0, 5).map((element) => {
        return { name: element, value: element };
      }),
    );
  }
};

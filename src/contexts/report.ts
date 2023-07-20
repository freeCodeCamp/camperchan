import {
  Guild,
  Message,
  EmbedBuilder,
  ApplicationCommandType,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
} from "discord.js";

import { Context } from "../interfaces/Context";
import { errorHandler } from "../utils/errorHandler";

export const report: Context = {
  data: {
    name: "report",
    type: ApplicationCommandType.Message,
  },
  run: async (Bot, interaction) => {
    try {
      const guild = interaction.guild;
      if (!guild) {
        await interaction.reply({
          content: "You cannot report DM messages!",
          ephemeral: true,
        });
        return;
      }
      const message = interaction.options.getMessage("message") as Message;

      if (!message) {
        await interaction.reply({
          content: `The message could not be loaded. Please try again. If the issue persists, ping <@!465650873650118659>`,
          ephemeral: true,
        });
        return;
      }

      const reportChannel = Bot.reportChannel;

      const author = message.author;

      const linkButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel("Message Link")
        .setURL(message.url);
      const acknowledgeButton = new ButtonBuilder()
        .setStyle(ButtonStyle.Success)
        .setLabel("Acknowledge")
        .setCustomId("acknowledge")
        .setEmoji("✅");
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
        linkButton,
        acknowledgeButton,
      ]);

      const reportEmbed = new EmbedBuilder();
      reportEmbed.setTitle("A message was flagged for review!");
      reportEmbed.setDescription(message.content.slice(0, 4000));
      reportEmbed.setAuthor({
        name: author.tag,
        iconURL: author.displayAvatarURL(),
      });
      reportEmbed.addFields(
        { name: "Channel", value: `<#${message.channel.id}>`, inline: true },
        {
          name: "Reported By",
          value: `<@${interaction.user.id}>`,
          inline: true,
        }
      );
      reportEmbed.setFooter({
        text: `ID: ${author.id}`,
      });

      const log = await reportChannel.send({
        embeds: [reportEmbed],
        components: [row],
      });

      const reason = new TextInputBuilder()
        .setLabel("Why are you reporting this message?")
        .setCustomId("reason")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);
      const modalRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
        reason
      );
      const modal = new ModalBuilder()
        .setCustomId(`report-${log.id}`)
        .setTitle("Message Report")
        .addComponents(modalRow);
      await interaction.showModal(modal);
    } catch (err) {
      await errorHandler(Bot, err);
    }
  },
};

import {
  EmbedBuilder,
  ApplicationCommandType,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
} from "discord.js";
import { errorHandler } from "../utils/errorHandler.js";
import type { Context } from "../interfaces/context.js";

export const report: Context = {
  data: {
    name: "report",
    type: ApplicationCommandType.Message,
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
      const { guild, options, user } = interaction;
      if (!guild) {
        await interaction.reply({
          content:   "You cannot report DM messages!",
          ephemeral: true,
        });
        return;
      }
      const message = options.getMessage("message", true);

      const { reportChannel } = camperChan;

      const { author, url, content, channel } = message;

      const linkButton = new ButtonBuilder().
        setStyle(ButtonStyle.Link).
        setLabel("Message Link").
        setURL(url);
      const acknowledgeButton = new ButtonBuilder().
        setStyle(ButtonStyle.Success).
        setLabel("Acknowledge").
        setCustomId("acknowledge").
        setEmoji("✅");
      const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
        linkButton,
        acknowledgeButton,
      ]);

      const reportEmbed = new EmbedBuilder();
      reportEmbed.setTitle("A message was flagged for review!");
      reportEmbed.setDescription(content.slice(0, 4000));
      reportEmbed.setAuthor({
        iconURL: author.displayAvatarURL(),
        name:    author.tag,
      });
      reportEmbed.addFields(
        { inline: true, name: "Channel", value: `<#${channel.id}>` },
        {
          inline: true,
          name:   "Reported By",
          value:  `<@${user.id}>`,
        },
      );
      reportEmbed.setFooter({
        text: `ID: ${author.id}`,
      });

      const log = await reportChannel.send({
        components: [ row ],
        embeds:     [ reportEmbed ],
      });

      const reason = new TextInputBuilder().
        setLabel("Why are you reporting this message?").
        setCustomId("reason").
        setStyle(TextInputStyle.Paragraph).
        setRequired(true);
      const modalRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
        reason,
      );
      const modal = new ModalBuilder().
        setCustomId(`report-${log.id}`).
        setTitle("Message Report").
        addComponents(modalRow);
      await interaction.showModal(modal);
    } catch (error) {
      await errorHandler(camperChan, "report context command", error);
    }
  },
};

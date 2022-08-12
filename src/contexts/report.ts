import { Guild, Message, EmbedBuilder } from "discord.js";

import { Context } from "../interfaces/Context";
import { errorHandler } from "../utils/errorHandler";

export const report: Context = {
  data: {
    name: "report",
    type: 3,
  },
  run: async (Bot, interaction) => {
    try {
      await interaction.deferReply({ ephemeral: true });
      const guild = interaction.guild as Guild;
      if (!guild) {
        await interaction.editReply("You cannot report DM messages!");
        return;
      }
      const message = interaction.options.getMessage("message") as Message;

      if (!message) {
        await interaction.editReply(
          "Something broke horribly. Please ping Naomi."
        );
        return;
      }

      const reportChannel = await guild.channels
        .fetch("987427452529836072")
        .catch(() => null);

      if (!reportChannel || !("send" in reportChannel)) {
        await interaction.editReply(
          "Something broke horribly. Please ping Naomi."
        );
        return;
      }

      const author = message.author;

      const reportEmbed = new EmbedBuilder();
      reportEmbed.setTitle("A message was flagged for review!");
      reportEmbed.setDescription(message.content.slice(0, 4000));
      reportEmbed.setAuthor({
        name: author.tag,
        iconURL: author.displayAvatarURL(),
      });
      reportEmbed.addFields(
        { name: "Link", value: message.url, inline: true },
        { name: "Channel", value: `<#${message.channel.id}>`, inline: true },
        {
          name: "Reported By",
          value: `<@${interaction.user.id}>`,
          inline: true,
        }
      );

      await reportChannel.send({ embeds: [reportEmbed] });
      await interaction.editReply(
        "This message has been flagged. Thanks for keeping the freeCodeCamp community safe!"
      );
    } catch (err) {
      await errorHandler(Bot, err);
    }
  },
};

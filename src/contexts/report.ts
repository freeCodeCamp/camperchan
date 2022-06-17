import { Guild, Message, MessageEmbed } from "discord.js";

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

      const reportChannel = await guild.channels.fetch("987427452529836072");

      if (!reportChannel || !("send" in reportChannel)) {
        await interaction.editReply(
          "Something broke horribly. Please ping Naomi."
        );
        return;
      }

      const author = message.author;

      const reportEmbed = new MessageEmbed();
      reportEmbed.setTitle("A message was flagged for review!");
      reportEmbed.setDescription(message.content.slice(0, 4000));
      reportEmbed.setAuthor({
        name: author.tag,
        iconURL: author.displayAvatarURL(),
      });
      reportEmbed.addField("Link", message.url, true);
      reportEmbed.addField("Channel", `<#${message.channel.id}>`, true);
      reportEmbed.addField("Reported By", `<@${interaction.user.id}>`, true);

      await reportChannel.send({ embeds: [reportEmbed] });
      await interaction.editReply(
        "This message has been flagged. Thanks for keeping the freeCodeCamp community safe!"
      );
    } catch (err) {
      await errorHandler(Bot, err);
    }
  },
};

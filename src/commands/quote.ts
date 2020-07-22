import { CommandDef } from './command-def';
import { MessageEmbed } from 'discord.js';

export const quote: CommandDef = {
  prefix: 'quote',
  description: 'Returns a quote from the FCC motivational quotes file',
  command: (message, { quoteData }) => {
    const quotes = quoteData.motivationalQuotes;
    const compliments = quoteData.compliments;
    const randomComp = Math.floor(Math.random() * compliments.length);
    const randomQuote = Math.floor(Math.random() * quotes.length);
    const quoteEmbed = new MessageEmbed()
      .setTitle(compliments[randomComp])
      .setDescription(quotes[randomQuote].quote)
      .setFooter(quotes[randomQuote].author);
    message.channel.send(quoteEmbed).catch((err) => console.error(err));
  }
};

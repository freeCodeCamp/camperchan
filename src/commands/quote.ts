import { CommandDef } from './command-def';
import { MessageEmbed } from 'discord.js';
import { MotivationalDef } from '../APIs/quote-def';

export const quote: CommandDef = {
  prefix: 'quote',
  description:
    "Returns a quote fetched from freeCodeCamp's motivational quotes API",
  usage: 'quote',
  command: (message, { quoteData }) => {
    const quotes: Array<MotivationalDef> = quoteData.motivationalQuotes;
    const compliments: Array<string> = quoteData.compliments;
    const randomComp = Math.floor(Math.random() * compliments.length);
    const randomQuote = Math.floor(Math.random() * quotes.length);
    const quoteEmbed = new MessageEmbed()
      .setTitle(compliments[randomComp])
      .setDescription(quotes[randomQuote].quote)
      .setFooter(quotes[randomQuote].author);
    message.channel.send(quoteEmbed).catch(console.error);
  }
};

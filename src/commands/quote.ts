import { CommandDef } from './command-def';
import fetch from 'node-fetch';
import { MessageEmbed, Message } from 'discord.js';

export const quote: CommandDef = {
  prefix: 'quote',
  description: 'Returns a quote from the FCC motivational quotes file',
  command: async (message) => {
    const data = await fetch(
      'https://raw.githubusercontent.com/freeCodeCamp/freeCodeCamp/master/config/motivational-quotes.json'
    );
    const parsed = await data.json();
    const quotes = parsed.motivationalQuotes;
    const compliments = parsed.compliments;
    const randomComp = Math.floor(Math.random() * compliments.length);
    const randomQuote = Math.floor(Math.random() * quotes.length);
    const quoteEmbed = new MessageEmbed()
      .setTitle(compliments[randomComp])
      .setDescription(quotes[randomQuote].quote)
      .setFooter(quotes[randomQuote].author);
    message.channel.send(quoteEmbed).catch((err) => console.error(err));
  }
};

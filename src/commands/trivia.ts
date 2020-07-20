import { CommandDef } from './command-def';
import facts from '../APIs/trivia-facts.json';
import { MessageEmbed } from 'discord.js';

export const triviaCommand: CommandDef = {
  prefix: 'trivia',
  description: 'Returns a random bit of trivia!',
  command: (message) => {
    const random = Math.floor(Math.random() * facts.length);
    const triviaEmbed = new MessageEmbed().setTitle('Random Fact!').addFields(
      {
        name: 'Fact',
        value: `${facts[random].fact}`
      },
      {
        name: 'Source',
        value: `${facts[random].source}`
      }
    );
    message.channel.send(triviaEmbed);
  }
};

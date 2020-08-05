import { Message } from 'discord.js';
import { CommandDef } from './command-def';

export const eightBall: CommandDef = {
  prefix: 'eightball',
  description:
    'Think of your question and get an answer from a magic pool ball!',
  usage: `eightball`,
  /**
   * @name eightBall
   * Randomly selects an option, and returns it to chat.
   *
   * @param message the message provided by discord
   */
  command: (message: Message): void => {
    const options = [
      'As I see it, yes.',
      'Ask again later.',
      'Better not tell you now.',
      'Cannot predict now.',
      'Concentrate and ask again.',
      "Don't count on it.",
      'It is certain.',
      'It is decidedly so.',
      'Most likely.',
      'My reply is no.',
      'My sources say no.',
      'Outlook not so good.',
      'Outlook good.',
      'Reply hazy, try again.',
      'Signs point to yes.',
      'Very doubtful.',
      'Without a doubt.',
      'Yes.',
      'Yes - definitely.',
      'You may rely on it.'
    ];
    const rand = Math.floor(Math.random() * options.length);
    message.channel.send(options[rand]);
  }
};

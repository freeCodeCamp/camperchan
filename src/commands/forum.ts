import { Message, MessageEmbed } from 'discord.js';
import { CommandDef } from './command-def';
import fetch from 'node-fetch';

export const forum: CommandDef = {
  prefix: 'forum',
  description: 'Gets the recent forum activity.',
  command: async (message: Message): Promise<void> => {
    try {
      const data = await fetch('https://forum.freecodecamp.org/latest.json');
      const parsed = await data.json();
      const result = parsed.topic_list.topics.slice(0, 5);
      const forumEmbed: MessageEmbed = new MessageEmbed()
        .setTitle('Latest Forum Activity')
        .setDescription('Here are the five most recent posts.');
      result.forEach((el: Record<string, unknown>) =>
        forumEmbed.addFields({
          name: `${el.title}`,
          value: `[${el.last_poster_username} replied on ${el.last_posted_at}](https://forum.freecodecamp.org/t/${el.id})`
        })
      );
      message.channel.send(forumEmbed);
    } catch (error) {
      console.error(error);
    }
  }
};

import { Message, MessageEmbed } from 'discord.js';
import { CommandDef } from './command-def';
import fetch from 'node-fetch';
import { ForumData, Topic } from '../APIs/forum-data';
import { logger } from '../utilities/logger';

export const forum: CommandDef = {
  prefix: 'forum',
  description: 'Gets the most recent activity from the freeCodeCamp forums.',
  usage: 'forum',
  command: async (message: Message): Promise<void> => {
    try {
      const data = await fetch('https://forum.freecodecamp.org/latest.json');
      const parsed: ForumData = await data.json();
      const topics: Topic[] = parsed.topic_list.topics.slice(0, 5);
      const forumEmbed: MessageEmbed = new MessageEmbed()
        .setTitle('Latest Forum Activity')
        .setDescription('Here are the five most recent posts.');
      topics.forEach((el) =>
        forumEmbed.addFields({
          name: `${el.title}`,
          value: `[${el.last_poster_username} replied on ${new Date(
            el.last_posted_at
          ).toLocaleString()}](https://forum.freecodecamp.org/t/${el.id})`
        })
      );
      message.channel.send({ embeds: [forumEmbed] });
    } catch (error) {
      logger.error(error);
    }
  }
};

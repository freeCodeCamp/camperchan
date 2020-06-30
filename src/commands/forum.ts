import { Message, MessageEmbed } from 'discord.js';
import { CommandDef } from './command-def';
import fetch from 'node-fetch';

export const forum: CommandDef = {
  prefix: 'forum',
  description: 'Gets the recent forum activity.',
  command: async (message: Message): Promise<void> => {
    const data = await fetch('https://forum.freecodecamp.org/latest.json');
    const parsed = await data.json();

    const forumEmbed: MessageEmbed = new MessageEmbed()
      .setTitle('Latest Forum Activity')
      .setDescription('Here are the five most recent posts.')
      .addFields(
        {
          name: `${parsed.topic_list.topics[0].title}`,
          value: `[${parsed.topic_list.topics[0].last_poster_username} replied on ${parsed.topic_list.topics[0].last_posted_at}](https://forum.freecodecamp.org/t/${parsed.topic_list.topics[0].id})`
        },
        {
          name: `${parsed.topic_list.topics[1].title}`,
          value: `[${parsed.topic_list.topics[1].last_poster_username} replied on ${parsed.topic_list.topics[0].last_posted_at}](https://forum.freecodecamp.org/t/${parsed.topic_list.topics[1].id})`
        },
        {
          name: `${parsed.topic_list.topics[2].title}`,
          value: `[${parsed.topic_list.topics[2].last_poster_username} replied on ${parsed.topic_list.topics[0].last_posted_at}](https://forum.freecodecamp.org/t/${parsed.topic_list.topics[2].id})`
        },
        {
          name: `${parsed.topic_list.topics[3].title}`,
          value: `[${parsed.topic_list.topics[3].last_poster_username} replied on ${parsed.topic_list.topics[0].last_posted_at}](https://forum.freecodecamp.org/t/${parsed.topic_list.topics[3].id})`
        },
        {
          name: `${parsed.topic_list.topics[4].title}`,
          value: `[${parsed.topic_list.topics[4].last_poster_username} replied on ${parsed.topic_list.topics[0].last_posted_at}](https://forum.freecodecamp.org/t/${parsed.topic_list.topics[4].id})`
        }
      );
    message.channel.send(forumEmbed).catch((e) => console.error(e));
  }
};

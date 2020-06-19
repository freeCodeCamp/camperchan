import { getUpTime } from '../utilities/get-up-time';
import { CommandDef } from './command-def';

export const stats: CommandDef = {
  prefix: 'stats',
  description: 'Get current server information!',
  /**
   * @name stats
   * Displays the server stats.
   * @param message the message provided by discord
   */
  command: (message, client): void => {
    try {
      const uptime = getUpTime(client);

      const statsEmbed = {
        color: '#0099FF',
        title: 'Server Information',
        description: 'Here is some information on our server!',
        fields: [
          {
            name: 'Server Name',
            value: message.guild?.name
          },
          {
            name: 'Bot Uptime',
            value: uptime
          },
          {
            name: 'Bot Online Time',
            value: 'Wake Time from JSON file'
          },
          {
            name: 'Created on',
            value: message.guild?.createdAt
          },
          {
            name: 'You joined on',
            value: message.member?.joinedAt
          },
          {
            name: 'Total Member Count is',
            value: message.guild?.memberCount
          },
          {
            name: 'Server run by',
            value: message.guild?.owner
          }
        ],
        footer: { text: 'Thanks for being here with us!' }
      };
      message.channel.send({ embed: statsEmbed });
    } catch (error) {
      console.error(error);
    }
  }
};

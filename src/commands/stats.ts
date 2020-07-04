import { getUpTime } from '../utilities/get-up-time';
import { CommandDef } from './command-def';
import getRepoInfo from 'git-repo-info';
const info = getRepoInfo();

export const stats: CommandDef = {
  prefix: 'stats',
  description: 'Get current server information!',
  /**
   * @name stats
   * Displays the server stats.
   * @param message the message provided by discord
   */
  command: (message, { client, config }): void => {
    try {
      const uptime = getUpTime(client);

      // If run locally, it will get the commit hash using a different approach
      const commitHash =
        process.env.SOURCE_VERSION?.slice(0, 10) || info.abbreviatedSha;

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
            value: config.ONLINE_AT
          },
          {
            name: 'Version',
            value: `[${commitHash}](https://github.com/bradtaniguchi/discord-bot-test/commit/${commitHash})`
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

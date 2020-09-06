import { Message } from 'discord.js';

import { getIssueNumbers } from '../utilities/get-issue-numbers';
import { issueEmbedGenerator } from '../utilities/issue-embed-generator';
import { IssueDef } from '../APIs/issue-def';
import { logger } from '../utilities/logger';
import { getIssueData } from '../utilities/get-issue-data';

export function issueEmbedder(message: Message): void {
  const issues = getIssueNumbers(message.content);

  if (issues.length > 0) {
    issues.forEach(async (issueNumber) => {
      try {
        const issueData: IssueDef = await getIssueData(issueNumber);

        const issueEmbed = issueEmbedGenerator(issueData.data, false);

        message.channel.send(issueEmbed);
      } catch (error) {
        logger.error(error);
      }
    });
  }
}

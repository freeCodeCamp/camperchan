import { Message } from 'discord.js';

import { getIssueNumbers } from '../utilities/get-issue-numbers';
import { issueEmbedGenerator } from '../utilities/issue-embed-generator';
import { logger } from '../utilities/logger';
import { getIssueData } from '../utilities/get-issue-data';

export async function issueEmbedder(
  message: Message,
  autoLinkLimit: number
): Promise<void> {
  const issues = getIssueNumbers(message.content);
  if (issues.length === 0) return;

  const limtedIssues = issues.slice(0, autoLinkLimit);

  for (const issueNumber of limtedIssues) {
    try {
      const { data } = await getIssueData(issueNumber);

      const issueEmbed = issueEmbedGenerator(data, false);

      message.channel.send(issueEmbed);
    } catch (error) {
      logger.error(error);
    }
  }
}

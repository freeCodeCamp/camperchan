import { Octokit } from '@octokit/rest';
import { Message } from 'discord.js';

import { getIssueNumbers } from '../utilities/get-issue-numbers';
import { issueEmbedGenerator } from '../utilities/issue-embed-generator';
import { IssueDef } from '../APIs/issue-def';

const octokit = new Octokit();

export function issueEmbedder(message: Message): void {
  const issues = getIssueNumbers(message.content);

  if (issues.length > 0) {
    issues.forEach(async (issueNumber) => {
      try {
        const infoToFeatch = {
          owner: 'freeCodeCamp',
          repo: 'freeCodeCamp',
          issue_number: issueNumber
        };

        const issueData: IssueDef = await octokit.request(
          'GET /repos/{owner}/{repo}/issues/{issue_number}',
          infoToFeatch
        );

        const issueEmbed = issueEmbedGenerator(issueData.data);

        message.channel.send(issueEmbed);
      } catch (error) {
        console.error(error);
      }
    });
  }
}

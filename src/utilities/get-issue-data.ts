import { Octokit } from '@octokit/rest';
import { IssueDef } from '../APIs/issue-def';

export function getIssueData(issueNumber: number): Promise<IssueDef> {
  const octokit = new Octokit();

  const infoToFeatch = {
    owner: 'freeCodeCamp',
    repo: 'freeCodeCamp',
    issue_number: issueNumber
  };

  const issueData: Promise<IssueDef> = octokit.request(
    'GET /repos/{owner}/{repo}/issues/{issue_number}',
    infoToFeatch
  );

  return issueData;
}

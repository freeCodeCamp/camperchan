import { Octokit } from '@octokit/rest';
import { GHIssueResponse } from '../APIs/github-def';

export function getIssueData(issueNumber: number): Promise<GHIssueResponse> {
  const octokit = new Octokit();

  const infoToFetch = {
    owner: 'freeCodeCamp',
    repo: 'freeCodeCamp',
    issue_number: issueNumber
  };

  const issueData: Promise<GHIssueResponse> = octokit.request(
    'GET /repos/{owner}/{repo}/issues/{issue_number}',
    infoToFetch
  );

  return issueData;
}

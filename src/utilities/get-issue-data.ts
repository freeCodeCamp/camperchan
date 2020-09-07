import { Octokit } from '@octokit/rest';
import { GithubResponse } from '../APIs/github-def';

export function getIssueData(issueNumber: number): Promise<GithubResponse> {
  const octokit = new Octokit();

  const infoToFetch = {
    owner: 'freeCodeCamp',
    repo: 'freeCodeCamp',
    issue_number: issueNumber
  };

  const issueData: Promise<GithubResponse> = octokit.request(
    'GET /repos/{owner}/{repo}/issues/{issue_number}',
    infoToFetch
  );

  return issueData;
}

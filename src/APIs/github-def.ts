import { Endpoints } from '@octokit/types';

type GHIssueEndpoint = Endpoints['GET /repos/:owner/:repo/issues/:issue_number'];

export type GHIssueResponse = GHIssueEndpoint['response'];

export type GHIssueData = GHIssueResponse['data'];

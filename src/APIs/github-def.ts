import { Endpoints } from '@octokit/types';

type GithubEndpoints = Endpoints['GET /repos/:owner/:repo/issues/:issue_number'];

export type GithubResponse = GithubEndpoints['response'];

export type GithubData = GithubEndpoints['response']['data'];

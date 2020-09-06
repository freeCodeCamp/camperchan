import { getIssueData } from './get-issue-data';

export function hyperlinkGenerator(issueNumbers: number[]): string {
  const issueList: string[][] = [];
  const prList: string[][] = [];
  issueNumbers.forEach(async (issueNumber) => {
    const issueRelatedData = await getIssueData(issueNumber);

    if (issueRelatedData.data.pull_request) {
      prList.push([
        issueRelatedData.data.number.toString(),
        issueRelatedData.data.html_url
      ]);
    } else {
      issueList.push([
        issueRelatedData.data.number.toString(),
        issueRelatedData.data.html_url
      ]);
    }
  });

  return '';
}

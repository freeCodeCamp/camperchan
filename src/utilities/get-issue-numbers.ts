export function getIssueNumbers(text: string): number[] {
  let processedString = text;
  if (processedString.includes('>')) {
    processedString = processedString.replace(/>(?<=>)(.*)(?=\n)/g, '');
  }
  const issueStrings = processedString.match(/#[\d]+(\s|$)/g);
  if (!issueStrings) {
    return [];
  }

  const issueNumbers: number[] = [];

  issueStrings.forEach((issue) => {
    const issueNumberOrNaN = Number(issue.substr(1).trim());

    if (!isNaN(issueNumberOrNaN)) {
      issueNumbers.push(issueNumberOrNaN);
    }
  });
  const issueNumbersWithoutDuplicate = [...new Set(issueNumbers)];

  return issueNumbersWithoutDuplicate;
}

export function getIssueNumbers(text: string): number[] {
  let processedString = text;
  if (processedString.includes('>')) {
    processedString = processedString.replace(/>(?<=>)(.*)(?=\n)/g, '');
  }
  const issueStrings = processedString.match(/#[0-9]+/g);

  const issueNumbers: number[] = [];

  if (issueStrings) {
    issueStrings.forEach((issue) => {
      const issueNumberOrNaN = Number(issue.substr(1));

      if (!isNaN(issueNumberOrNaN)) {
        if (issueNumberOrNaN > 50) {
          issueNumbers.push(issueNumberOrNaN);
        }
      }
    });
  }

  return issueNumbers;
}

export function getIssueNumbers(text: string): (number | undefined)[] {
  let processedString = text;
  if (processedString.includes('>')) {
    processedString = processedString.replace(/>(?<=>)(.*)(?=\n)/gi, '');
  }
  const issueStrings = processedString.match(/#[0-9]+/g);

  let issueNumbers: (number | undefined)[] = [];

  if (issueStrings) {
    issueNumbers = issueStrings.map((issue) => {
      const issueNumberOrNaN = Number(issue.substr(1));

      if (!isNaN(issueNumberOrNaN)) {
        return issueNumberOrNaN;
      }
    });
  }

  return issueNumbers;
}

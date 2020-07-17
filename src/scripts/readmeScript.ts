import { COMMANDS } from '../commands/commands';
import { readFile, writeFile } from 'fs';
import { stripIndents } from 'common-tags';

const flags = process.argv.slice(2);

const commandTable = stripIndents`
  ## Available Commands
  | Prefix | Description |
  | :-: | :-: |
  ${COMMANDS.map(
    (command) => '| ' + command.prefix + ' | ' + command.description + ' |\n'
  ).join('')}
`;

// if there is an argument --autoUpdateReadme while running the command,
// it will run this
if (flags.includes('--autoUpdateReadme')) {
  readFile('README.md', 'utf-8', (err, data) => {
    if (err) throw err;

    // Change the regex in this line to determine where you're going to put it at...
    const results = data.replace(
      /## Available Commands.*## Additional Information/gs,
      commandTable
    );

    writeFile('README.md', results, 'utf8', (err) => {
      if (err) return console.log(err);
      else console.log('README.md updated');
    });
  });
} else {
  console.log(commandTable);
}

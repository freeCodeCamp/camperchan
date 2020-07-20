import { COMMANDS } from '../src/commands/commands';
import { promises } from 'fs';
import { stripIndents } from 'common-tags';
import chalk from 'chalk';
const { readFile, writeFile } = promises;

/**
 * Available Flags:
 * • --updateReadme (This flag will make the script update the readme)
 */
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
  readFile('README.md', 'utf-8')
    .then((data) => {
      // Change the regex in this line to determine where you're going to put it at...
      const results = data.replace(
        /## Available Commands.*## Additional Information/gs,
        commandTable
      );

      return writeFile('README.md', results, 'utf-8');
    })
    .then(() => console.log('README.md updated'))
    .catch((err) => console.log(err));
} else {
  console.log(commandTable);
  console.log(stripIndents`
  \u200b
  Job Done, ${chalk.red('NOTHING')} is changed, commands are logged above...

  If you want to update the README automatically, you can use the \`--autoUpdateReadme\` flag
  You can either update directly in the npm script inside the package.json
  ${chalk.black.bgGreen('OR')}\n
  Passing in while running the script.
  Here's an example:

  \u200b${chalk.black.bgBlue('npm run update-readme -- --autoUpdateReadme')}\n
  `);
}

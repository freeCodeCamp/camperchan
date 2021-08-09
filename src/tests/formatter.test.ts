import { formatter } from '../utilities/formatter';

describe('formatter tests', () => {
  describe('Should format supported languages', () => {
    it('Should format code block as HTML', () => {
      const formattedCode = formatter('<h1>Hello!!!</h1>', 'html');

      expect(formattedCode).toBe('<h1>Hello!!!</h1>\n');
    });

    it('Should format code block as CSS', () => {
      const formattedCode = formatter('body { margin: 0; }', 'css');

      expect(formattedCode).toBe('body {\n  margin: 0;\n}\n');
    });

    it('Should format code block as JavaScript', () => {
      const formattedCode = formatter('console.log(lol)', 'js');

      expect(formattedCode).toBe('console.log(lol);\n');
    });

    it('Should format code block as JSON', () => {
      const formattedCode = formatter('{"FCC":"Rocks!","number":123}', 'json');

      expect(formattedCode).toBe('{ "FCC": "Rocks!", "number": 123 }\n');
    });

    it('Should format code block as Markdown', () => {
      const sampleMarkdown = `## Contributing

      So, you want to contribute to this repo? We are glad to recieve PRs from anybody who is interested.

      The easiest way to contribute to the development of the bot is using [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](http://gitpod.io/#https://github.com/bradtaniguchi/discord-bot-test). It starts up an already working version of the bot with all the code so you can start working right now! (You'll have to add the \`TOKEN\` variable in the \`.env\` file)

      Follow these steps if you are new to contributing to open source projects:

      1. [Install the required softwares](#install-prerequisites)
      2. Fork the repo
         ![GIF - How to fork on GitHub](../media/fork-resized.gif?raw=true)
      3. Clone your forked repo
      4. Create a new branch on the cloned repo and switch to it
         ![GIF - How to create a branch and switch to it with Git](../media/create-local-new-branch.gif?raw=true)
      5. Make changes to add, update or fix a feature
      6. Review/test/debug your changes by [running the bot locally](#running-locally)
      7. Commit changes and do a Pull Request (aka PR in short)

      ...and that is it! You are now a contributor!`;

      const expectedOutput = `## Contributing\n
      So, you want to contribute to this repo? We are glad to recieve PRs from anybody who is interested.\n
      The easiest way to contribute to the development of the bot is using [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](http://gitpod.io/#https://github.com/bradtaniguchi/discord-bot-test). It starts up an already working version of the bot with all the code so you can start working right now! (You'll have to add the \`TOKEN\` variable in the \`.env\` file)\n
      Follow these steps if you are new to contributing to open source projects:\n
      1. [Install the required softwares](#install-prerequisites)
      2. Fork the repo
         ![GIF - How to fork on GitHub](../media/fork-resized.gif?raw=true)
      3. Clone your forked repo
      4. Create a new branch on the cloned repo and switch to it
         ![GIF - How to create a branch and switch to it with Git](../media/create-local-new-branch.gif?raw=true)
      5. Make changes to add, update or fix a feature
      6. Review/test/debug your changes by [running the bot locally](#running-locally)
      7. Commit changes and do a Pull Request (aka PR in short)\n
      ...and that is it! You are now a contributor!\n`;

      const formattedCode = formatter(sampleMarkdown, 'markdown');

      expect(formattedCode).toBe(expectedOutput);
    });

    it('Should format code block as Yaml', () => {
      const sampleYaml = `# Gitpod suggested commands to add github support to gitpod.
# This should make using gitpod easier and faster.
github:
    prebuilds:
    # enable for the master/default branch (defaults to true)
    master: true
    # enable for all branches in this repo (defaults to false)
    branches: false
    # enable for pull requests coming from this repo (defaults to true)
    pullRequests: true
    # enable for pull requests coming from forks (defaults to false)
    pullRequestsFromForks: true
    # add a "Review in Gitpod" button as a comment to pull requests (defaults to true)
    addComment: true
    # add a "Review in Gitpod" button to pull requests (defaults to false)
    addBadge: false
    # add a label once the prebuild is ready to pull requests (defaults to false)
    addLabel: prebuilt-in-gitpod`;

      const expectedOutput = `# Gitpod suggested commands to add github support to gitpod.
# This should make using gitpod easier and faster.
github:
  prebuilds:
  # enable for the master/default branch (defaults to true)
  master: true
  # enable for all branches in this repo (defaults to false)
  branches: false
  # enable for pull requests coming from this repo (defaults to true)
  pullRequests: true
  # enable for pull requests coming from forks (defaults to false)
  pullRequestsFromForks: true
  # add a "Review in Gitpod" button as a comment to pull requests (defaults to true)
  addComment: true
  # add a "Review in Gitpod" button to pull requests (defaults to false)
  addBadge: false
  # add a label once the prebuild is ready to pull requests (defaults to false)
  addLabel: prebuilt-in-gitpod\n`;

      const formattedCode = formatter(sampleYaml, 'yaml');

      expect(formattedCode).toBe(expectedOutput);
    });
  });

  describe('Should catch and warn about syntax errors', () => {
    it('Should show syntax errors for JS', () => {
      const formattedCode = formatter('cons a = 132;', 'js');

      const expectedOutput = `SyntaxError: Unexpected token (1:5)\n
> 1 | cons a = 132;
    |     ^`;

      expect(formattedCode).toBe(expectedOutput);
    });

    it('Should show syntax errors for CSS', () => {
      const formattedCode = formatter(
        'body { background: #fff, color: red; }',
        'css'
      );

      const expectedOutput = `SyntaxError: Unexpected token (1:20)\n
> 1 | body { background: #fff, color: red; }
    |                    ^`;

      expect(formattedCode).toBe(expectedOutput);
    });
  });
});

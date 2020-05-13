# Discord Test Bot

A discord test bot used to test out architecture and implementing a discord bot. This project is a way to get familiar with the architecture, APIs and process of maintaining a discord bot.

## Contributing

So, you want to contribute to this repo? We are glad to recieve PRs from anybody who is interested. Follow these steps if you are new to contributing to open source projects -

1. [Install the required softwares](#install-prerequisites)
1. Fork the repo
1. Clone your forked repo
1. Create a new branch on the cloned repo and swith to it
1. Make changes to add, update or fix a feature
1. Review/test/debug your changes by [running the bot locally](#running-locally)
1. Commit changes and do a Pull Request (aka PR in short)

...and that's it! You're now a contributor! 😎

## Install prerequisites

Start by installing the prerequisite softwares:

| Name                          | Version | Notes                                                                |
| ----------------------------- | ------- | -------------------------------------------------------------------- |
| Node.js                       | `12.x`  | [Download Node.js](http://nodejs.org)                                |
| npm (comes bundled with Node) | `6.x`   | Does not have LTS releases, we use the version bundled with Node LTS |
| git                           | `2.x`   | [Download Git](https://git-scm.com/)                                 |

If your going to contribute to this project, you'll also need a text-editor. You can use _any_ text editor you want, but we recommend using [VSCode](https://code.visualstudio.com/).

If you don't know what these softwares are, don't worry much. These are essential softwares required to contribute to open source projects.

## Running locally

To test and develop this bot, you have to run it locally. To run the bot locally you have to follow the following steps -

1. Open the folder of your cloned repo
2. Create a file in the folder called `.env` and add your [Discord bot token](#creating-a-discord-bot-token) like this:

```
TOKEN=replace-this-with-your-token
```

2. Open the terminal in that folder
3. Type the following command and hit enter:

```bash
npm i
```

3. Type the following command and hit enter:

```bash
npm run dev
```

## Creating a Discord bot token

If you don't have a Discord bot token, you'll have to create one. To create a Discord bot token, follow these steps -

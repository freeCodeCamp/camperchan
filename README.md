# Discord Test Bot

A discord test bot used to test out architecture and implementing a discord bot. This project is a way to get familiar with the architecture, APIs and process of maintaining a discord bot.

## Contributing

So, you want to contribute to this repo? We are glad to recieve PRs from anybody who is interested. Follow these steps if you are new to contributing to open source projects -

1. [Install the required softwares](#install-prerequisites)
2. Fork the repo
   ![GIF - How to fork on GitHub](../media/fork-resized.gif?raw=true)
3. Clone your forked repo
4. Create a new branch on the cloned repo and switch to it
   ![GIF - How to create a branch and switch to it with Git](../media/create-local-new-branch.gif?raw=true)
5. Make changes to add, update or fix a feature
6. Review/test/debug your changes by [running the bot locally](#running-locally)
7. Commit changes and do a Pull Request (aka PR in short)

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

3. Open the terminal in that folder
4. Type the following command and hit enter:

```bash
npm i
```

5. Type the following command and hit enter:

```bash
npm run dev
```

## Creating a Discord bot token

If you don't have a Discord bot token, you'll have to create one. To create a Discord bot token, follow these steps -

1. Go to the [Developer Portal](https://discord.com/developers/applications/) website and log in
2. Click on the "New Application" button
3. Enter a name
4. Then confirm the pop-up window by clicking the "Create" button. By now you will probably see a page like this:
   ![PNG - Created App Page](../media/create-app.png?raw=true)

5) Click on the `Bot` tab on the left pane
   ![PNG - 'Bot' Button In Left Pane](../media/create-bot-in-pane.png?raw=true)
6) Click the "Add Bot" button on the right and confirm the pop-up window by clicking "Yes, do it!". After doing so, you'll see a section similar to this one:
   ![PNG - Bot Created Successfully](../media/created-bot.png?raw=true)
7) Now pressing the "Copy" button will copy your `Token` to your clipboard.

...and that's it!

## Additional Information

This bot uses the [discord.js](https://discord.js.org) library to interact with the Discord API rather than directly doing so. You can check out the docs for the library [here](https://discord.js.org/#/docs/main/stable/general/welcome).

## Ask For Help

If you have any question about the project, you can create an issue and ask it. You can also reach us in the FCC's official [Discord](https://discord.gg/KVUmVXA).

Happy Coding!

### Disclaimer

This test-bot was created to allow us to test the discord.js library and experiement with setting up our own Discord bot. Our intent is to help [FreeCodeCamp](https://www.freecodecamp.org) set up a bot for their Discord server - however, the files in this repository are **NOT** associated with FreeCodeCamp in any way. 

FreeCodeCamp issue:
[freeCodeCamp/freeCodeCamp#38711](https://github.com/freeCodeCamp/freeCodeCamp/issues/38711)

FreeCodeCamp forum post:
https://www.freecodecamp.org/forum/t/create-a-new-camperbot-for-the-official-discord-server/387311


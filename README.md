# Discord Test Bot

[![Build Status](https://travis-ci.org/bradtaniguchi/discord-bot-test.svg?branch=master)](https://travis-ci.org/bradtaniguchi/discord-bot-test)

A Discord test bot used to test out the architecture and implementation of a Discord bot. This project is a way to get familiar with the architecture, APIs and process of maintaining a Discord bot.

## Contents

<!-- toc -->

- [Contributing](#contributing)
- [Install prerequisites](#install-prerequisites)
- [Running locally](#running-locally)
- [Running the bot in Discord](#running-the-bot-in-discord)
- [Creating a Discord bot token](#creating-a-discord-bot-token)
- [Restricting Bot Access to Channels](#restricting-bot-access-to-channels)
- [Debugging using VSCode](#debugging-using-vscode)
- [Available Commands](#available-commands)
- [Available Reactions](#available-reactions)
- [Ask For Help](#ask-for-help)
- [Acknowledgements](#acknowledgements)
- [Disclaimer](#disclaimer)

<!-- tocstop -->

## Contributing

So, you want to contribute to this repo? We are glad to recieve PRs from anybody who is interested.

The easiest way to contribute to the development of the bot is using [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](http://gitpod.io/#https://github.com/bradtaniguchi/discord-bot-test). It starts up an already working version of the bot with all the code so you can start working right now! (You'll have to add the `TOKEN` variable in the `.env` file)

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

...and that is it! You are now a contributor! 😎

## Install prerequisites

Start by installing the prerequisite software:

| Name                          | Version | Notes                                                                |
| ----------------------------- | ------- | -------------------------------------------------------------------- |
| Node.js                       | `12.x`  | [Download Node.js](http://nodejs.org)                                |
| npm (comes bundled with Node) | `6.x`   | Does not have LTS releases, we use the version bundled with Node LTS |
| git                           | `2.x`   | [Download Git](https://git-scm.com/)                                 |

If you are going to contribute to this project, you will also need a text editor. You can use _any_ text editor you want, but we recommend using [VSCode](https://code.visualstudio.com/).

If you do not know what these software are, do not worry. These are essential software required to contribute to open source projects.

## Running locally

To test and develop this bot you have to run it locally. To run the bot locally, follow these steps:

1. Open the folder of your cloned repo
2. Create a file in that folder called `.env` and add your [Discord bot token](#creating-a-discord-bot-token) like this:

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

6. To test the bot in Discord, follow [these steps](#running-the-bot-in-Discord)

## Running the bot in Discord

This bot requires the `Manage Messages` permission to run. So, if you want to use this bot in a Discord server (for testing or production purpose), you will need to grant it the `Manage Messages` permission. Luckily we've done
the hard work for you, so that you don't have to do it manually.

First, head over [Discord Developer Portal](https://discordapp.com/developers/applications/me) and sign in. After
that, select your bot by clicking it's icon.

![PNG - Discord Developer Portal](../media/dev-portal.png)

Just beside your bot's icon, you will see your `CLIENT ID`. Copy the `CLIENT ID`.

![PNG - Client ID](../media/client-id.png)

Then replace the `YOUR_CLIENT_ID_HERE` with your bot's `CLIENT ID` in the link provided below. After that, you can use the link to add the bot to any existing or newly created Discord server (as long as you have the `Manage Server` permission).

_https://discordapp.com/oauth2/authorize?client_id=YOUR_CLIENT_ID_HERE&scope=bot&permissions=268512272_

**IMPORTANT NOTE :** When you click on the link and want to add the bot to a server, it'll ask for the following permissions. You must approve these permissions for the bot to work correctly:

`Manage Roles`, `Manage Messages`, `Manage Channels`, `View Channels`, `Read Message History`, `Send Messages`

This link will automatically create a role specifically for the bot. You need to ensure this role is **ABOVE** your `suspended` role in the server settings or that command will not work properly. Discord only allows a user (or bot) to assign/modify roles placed below their highest role in the list.

## Creating a Discord bot token

If you do not have a Discord bot token, you will have to create one. To create a Discord bot token, follow these steps:

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

...and that is all!

## Restricting Bot Access to Channels

For testing purposes, you may wish to restrict the bot's access to specific channels.

When you add the bot to your Discord server, the system will automatically create a role for that bot. In order to restrict access to channels, it is important that the bot and bot role do **not** have the "Administrator" permission (this overrides channel-specific permissions).

For each channel you want keep the bot _out_ of, you need to do the following:

1. Select the gear icon next to the channel.
2. Select "Permissions".
3. Next to the Roles/Members, click the `+` icon.
4. Add the bot's role.
5. The added role should now be selected.
6. To the right, go through the permissions list and set each permission to the red "X".
   The most important permissions to turn off are "Read message history", "Read messages", and "Send messages".
7. Save your changes! The Discord application will show a pop-up at the bottom of the screen asking you to "Save Changes" or "Reset" - choose "Save Changes".

Your bot now has no access to that channel, and users cannot send it commands from that channel!

## Debugging using VSCode

Provided is an example `launch.json` file that should be put into `.vscode/launch.json` (this folder and file is untracked by git). This can be used **after** you start the `npm run dev` to help debug the application using breakpoints using
vscode's internal debugger.

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "debug",
      "restart": true,
      "protocol": "inspector",
      "port": 9229
    }
  ]
}
```

## Available Commands

|  Prefix   |                                                                                         Description                                                                                          |
| :-------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| eightball |                                                               Think of your question and get an answer from a magic pool ball!                                                               |
|   help    |                                                                      Get the commands currently available with this bot                                                                      |
|   stats   |                                                                               Get current server information!                                                                                |
|    coc    |                                                                                Provides the Code of Conduct.                                                                                 |
|  suspend  |                                 Suspends a user for the given reason. This command is only available to admins. Use the format "suspend <usertag> <reason>"                                  |
|   close   | Closes the channel. This command requires admin privileges, and will only work on the automatically created "suspended" channels. Include the user if you want to remove the suspended role. |
|   forum   |                                                                               Gets the recent forum activity.                                                                                |
|  format   |                                                                        Formats the code contained in the message URL.                                                                        |
|  trivia   |                                                                               Returns a random bit of trivia!                                                                                |
|   quote   |                                                                    Returns a quote from the FCC motivational quotes file                                                                     |

This bot uses the [discord.js](https://discord.js.org) library to interact with the Discord API. You can check out the docs for the library [here](https://discord.js.org/#/docs/main/stable/general/welcome).

## Available Reactions

| Prefix |                Description                |
| :----: | :---------------------------------------: |
|   📌   | Sends message to the current user as a DM |
|   🤖   |      Guesses and formats the message      |

## Ask For Help

If you have any questions or suggestions about the project, you can create an issue for your question. Please provide as much information as possible when creating an issue. You can also reach us in the FCC's official [Discord](https://discord.gg/KVUmVXA).

Happy Coding!

## Acknowledgements

- [bradtaniguchi](https://github.com/bradtaniguchi)
- [twaha-rahman](https://github.com/twaha-rahman)
- [nhcarrigan](https://github.com/nhcarrigan)
- [cjcanlas01](https://github.com/cjcanlas01)
- [JoshuaPelealu](https://github.com/JoshuaPelealu)

## Disclaimer

This test-bot was created to allow us to test the discord.js library and experiment with setting up our own Discord bot. Our intent is to help [FreeCodeCamp](https://www.freecodecamp.org) set up a bot for their Discord server - however, the files in this repository are **NOT** associated with FreeCodeCamp in any way.

FreeCodeCamp issue:
[freeCodeCamp/freeCodeCamp#38711](https://github.com/freeCodeCamp/freeCodeCamp/issues/38711)

FreeCodeCamp forum post:
https://www.freecodecamp.org/forum/t/create-a-new-camperbot-for-the-official-discord-server/387311

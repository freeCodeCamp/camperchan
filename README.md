# Discord Test Bot

[![Build Status](https://travis-ci.org/bradtaniguchi/discord-bot-test.svg?branch=master)](https://travis-ci.org/bradtaniguchi/discord-bot-test)
[![Discord](https://img.shields.io/discord/705679411936100416?color=purple)](https://discord.gg/BqRZ85t)
![Issues](https://img.shields.io/github/issues/bradtaniguchi/discord-bot-test)
![PRs](https://img.shields.io/github/issues-pr/bradtaniguchi/discord-bot-test)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/bradtaniguchi/discord-bot-test.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/bradtaniguchi/discord-bot-test/alerts/)
[![Setup Automated](https://img.shields.io/badge/setup-automated-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

A Discord test bot used to test out the architecture and implementation of a Discord bot. This project is a way to get familiar with the architecture, APIs and process of maintaining a Discord bot.

## Contents

<!-- toc -->

- [Available Commands](#available-commands)
- [Available Reactions](#available-reactions)
- [Ask For Help](#ask-for-help)
- [Acknowledgements](#acknowledgements)
- [Disclaimer](#disclaimer)
- [FreeCodeCamp Moderation](#freecodecamp-moderation)

<!-- tocstop -->

## Available Commands

|  Prefix   |                                                                                                   Description                                                                                                    |
| :-------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| eightball |                                                                         Think of your question and get an answer from a magic pool ball!                                                                         |
|   help    |            If a command is not specified, it will display all the available commands into a list. If a command is specified, it will display the usage for that command and the description for them.            |
|   stats   |                                                                       Get the server's information along with some simple bot information.                                                                       |
|    coc    |                                                                                          Provides the Code of Conduct.                                                                                           |
|  suspend  |                                                                 Suspends a user for the given reason. This command is only available to admins.                                                                  |
|   close   | Closes the channel. This command requires admin privileges, and will only work on the automatically created "suspended" channels. Mentioning user with the command will remove the suspended role from the user. |
|   forum   |                                                                           Gets the most recent activity from the freeCodeCamp forums.                                                                            |
|  format   |                                                                                   Formats the code from the given message URL.                                                                                   |
|  trivia   |                                                                                         Returns a random bit of trivia!                                                                                          |
|   user    |                                                                                         Get data on the user mentioned.                                                                                          |
|   quote   |                                                            Returns a quote from freeCodeCamp's motivational quotes file fetched using the GitHub API                                                             |
|    mod    |                                                                                           Provides helpful mod links.                                                                                            |

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

This test-bot was created to allow us to test the discord.js library and experiment with setting up our own Discord bot. Our intent is to help [FreeCodeCamp](https://www.freecodecamp.org) set up a bot for their Discord server - however, the files in this repository are **NOT** associated with freeCodeCamp in any way.

FreeCodeCamp issue:
[freeCodeCamp/freeCodeCamp#38711](https://github.com/freeCodeCamp/freeCodeCamp/issues/38711)

FreeCodeCamp forum post:
https://www.freecodecamp.org/forum/t/create-a-new-camperbot-for-the-official-discord-server/387311

## FreeCodeCamp Moderation

As mentioned above, this bot is not officially connected to freeCodeCamp. However, the bot _is_ currently serving as a proof-of-concept or minimum viable product - as such, freeCodeCamp moderators may find themselves here for instruction on using the bot. If this applies to you, documentation for how to utilise the bot's moderation features can be found at the [freeCodeCamp Moderator Handbook](https://forum.freecodecamp.org/t/the-freecodecamp-moderator-handbook/18295).

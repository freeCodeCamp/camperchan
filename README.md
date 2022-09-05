# Discord Test Bot

A Discord test bot used to test out the architecture and implementation of a Discord bot. This project is a way to get familiar with the architecture, APIs and process of maintaining a Discord bot.

## Contents

<!-- toc -->

- [Contributing](#contributing)
- [Available Commands](#available-commands)
- [Available Reactions](#available-reactions)
- [Ask For Help](#ask-for-help)
- [Contributors](#contributors)
- [Disclaimer](#disclaimer)
- [FreeCodeCamp Moderation](#freecodecamp-moderation)

<!-- tocstop -->

## Contributing

If you are interested in contributing to this project, please review our [contributing guidelines](CONTRIBUTING.md)

## Available Commands

|  Prefix   |                                                                                                   Description                                                                                                    |
|:---------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| eightball |                                                                         Think of your question and get an answer from a magic pool ball!                                                                         |
|   help    |            If a command is not specified, it will display all the available commands into a list. If a command is specified, it will display the usage for that command and the description for them.            |
|   stats   |                                                                       Get the server's information along with some simple bot information.                                                                       |
|    coc    |                                                                                          Provides the Code of Conduct.                                                                                           |
|  suspend  |                                                                 Suspends a user for the given reason. This command is only available to admins.                                                                  |
|   close   | Closes the channel. This command requires admin privileges, and will only work on the automatically created "suspended" channels. Mentioning user with the command will remove the suspended role from the user. |
|   forum   |                                                                           Gets the most recent activity from the freeCodeCamp forums.                                                                            |
|  format   |                                                                                   Formats the code from the given message URL.                                                                                   |
|  trivia   |                                                                                         Returns a random bit of trivia!                                                                                          |
|   tags    |                                                                      Outputs standard blocks of text. Tag list [here](/src/config/Tags.ts).                                                                      |
|   user    |                                                                                         Get data on the user mentioned.                                                                                          |
|   quote   |                                                            Returns a quote from freeCodeCamp's motivational quotes file fetched using the GitHub API                                                             |
|    mod    |                                                                                           Provides helpful mod links.                                                                                            |

## Available Reactions

| Prefix |                Description                |
| :----: | :---------------------------------------: |
|   p    | Sends message to the current user as a DM |
|  p\$   |      Guesses and formats the message      |

## Ask For Help

If you have any questions or suggestions about the project, you can create an issue for your question. Please provide as much information as possible when creating an issue. You can also reach us in the FCC's official [Discord](https://discord.gg/KVUmVXA).

Happy Coding!

## Contributors :sparkles:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/nhcarrigan">
        <img
          src="https://avatars1.githubusercontent.com/u/63889819?v=4"
          width="100;"
          alt="nhcarrigan"
        />
        <br />
        <sub>
          <b>Nicholas Carrigan</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/bradtaniguchi">
        <img
          src="https://avatars3.githubusercontent.com/u/10079147?v=4"
          width="100;"
          alt="bradtaniguchi"
        />
        <br />
        <sub>
          <b>Brad</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Twaha-Rahman">
        <img
          src="https://avatars1.githubusercontent.com/u/39026437?v=4"
          width="100;"
          alt="Twaha-Rahman"
        />
        <br />
        <sub>
          <b>Twaha Rahman</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/JoshuaPelealu">
        <img
          src="https://avatars1.githubusercontent.com/u/45566099?v=4"
          width="100;"
          alt="JoshuaPelealu"
        />
        <br />
        <sub>
          <b>Joshua Pelealu</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/cjcanlas01">
        <img
          src="https://avatars1.githubusercontent.com/u/40020298?v=4"
          width="100;"
          alt="cjcanlas01"
        />
        <br />
        <sub>
          <b>Christian John Canlas</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/takuma-watanabe">
        <img
          src="https://avatars2.githubusercontent.com/u/32568002?v=4"
          width="100;"
          alt="takuma-watanabe"
        />
        <br />
        <sub>
          <b>Takuma</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## Disclaimer

This test-bot was created to allow us to test the discord.js library and experiment with setting up our own Discord bot. Our intent is to help [FreeCodeCamp](https://www.freecodecamp.org) set up a bot for their Discord server - however, the files in this repository are **NOT** associated with freeCodeCamp in any way.

FreeCodeCamp issue:
[freeCodeCamp/freeCodeCamp#38711](https://github.com/freeCodeCamp/freeCodeCamp/issues/38711)

FreeCodeCamp forum post:
https://www.freecodecamp.org/forum/t/create-a-new-camperbot-for-the-official-discord-server/387311

## FreeCodeCamp Moderation

As mentioned above, this bot is not officially connected to freeCodeCamp. However, the bot _is_ currently serving as a proof-of-concept or minimum viable product - as such, freeCodeCamp moderators may find themselves here for instruction on using the bot. If this applies to you, documentation for how to utilise the bot's moderation features can be found at the [freeCodeCamp Moderator Handbook](https://contribute.freecodecamp.org/#/flight-manuals/moderator-handbook).

# Contributing

To develop this project locally, you will need to be running [NodeJS v20](https://nodejs.org/en/) and [pnpm v9](https://pnpm.io/).

## Environment Variables

If you have not done so already, fork this repository to your account and clone it.

> [!CAUTION]
> This project uses [1Password's CLI](https://developer.1password.com/docs/cli/use-cases#secrets) to manage environment variables. If you do not use 1password, or do not have the CLI set up, these instructions may not work for you.
>
> If you aren't sure how to structure your secret references, take a look at `dev.env`.

You'll need to head over to the [Discord Developer Portal](https://discord.dev) and create your application.

- Select the `Applications` tab on the left sidebar.
- Click the `New Application` button.
- Give your application a name and click `Create`.
- Select the `Bot` tab on the left sidebar.
- Click the `Add Bot` button.
- Click the `Copy` button to copy your bot's token.

Add the token to 1password, and paste the secret reference as `TOKEN` in your `dev.env` file

 Switch back to the `General Information` tab and copy the `Client ID`. Paste that secret reference as `BOT_ID` in your `dev.env` file.

Next, head over to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and either [set up an account](https://www.freecodecamp.org/news/get-started-with-mongodb-atlas/) or sign in. Choose the database you'd like to use, and get your connection string. Paste the secret reference from 1password as `MONGO_URI` in your `.env` file.

The bot uses two Discord webhooks, one for debug logging and one for moderation action logs. For local testing, you can use the same webhook URL for both. Right-click on a channel in your server, select `Edit Channel`, and pick the `Integrations` tab on the sidebar. Click the `Create Webhook` button, give it a name, and copy the URL. Paste the secret references as `DEBUG_HOOK` and `MOD_HOOK` in your `.env` file.

If you haven't already enabled Developer Mode in your Discord client, you can do this by opening your user/app setting and selecting `Advanced`,  then toggling `Developer Mode` on.

Right-click on your Discord server icon (the one in which you'll be running the bot) and select `Copy ID`. This goes in your `.env` file as `HOME_GUILD`.

> [!NOTE]
> This bot is designed for a single-guild use case. Commands will only be registered in the server specified by `HOME_GUILD`.

Finally, for the private conversation system, you need to specify a moderation role (which gets added to each ticket) and the category private channels should be opened in. Right-click on the role you'd like to use and select `Copy ID`. Paste that as `MOD_ROLE` in your `.env` file. Right-click on the **category** you'd like to use and select `Copy ID`. Paste that as `PRIVATE_CATEGORY` in your `.env` file.

> [!TIP]
> If you still prefer to use a raw `.env` file, you can safely do so - the file will not be committed to `git`. However, you will need to start the bot manually with `node -r dotenv/config prod/index.js`. The TSX Development command will NOT work with this approach.

## Preparing the Code

Install the dependencies:

```bash
pnpm i --frozen-lockfile
```

Build the code:

```bash
pnpm run build
```

## Inviting the Bot

To add the bot to your server, head back to your application page on the developer portal, select the `OAuth` tab, select `URL Generator`, and check the `bot` and `application.commands` scopes. A second section to select permissions will appear. Check the following permissions:

- Manage Channels
- Manage Roles
- Kick Members
- Ban Members
- Time out members (or Moderate Members)

Copy the URL and open it in a new tab. Select the server you'd like to add the bot to and click `Continue`. Click `Authorize` to add the bot to your server.

## Gateway Intents

Discord marks specific gateway intents as "privileged". Back on your application page, select the `Bot` tab, and scroll down to the `Privileged Gateway Intents` section. Check the following intents:

- Server Members Intent
- Message Content Intent

## Running the Bot

Finally, everything should be set up to run the bot. Start it with:

```bash
pnpm start
```

You should see the bot come online, and a message sent to your debug webhook letting you know the bot is ready.

## Submitting a Pull Request

We are happy to accept contributions to this project. Please ensure that all code contributions follow our standard:

```bash
pnpm run lint
```

> [!WARNING]
> If you try to use `npm` to run the lint script, unexpected errors may occur. This is due to the way our external configs are linked in the `node_modules` directory.

If you have any issues or questions, feel free to [ask us in Discord](https://discord.gg/KVUmVXA).

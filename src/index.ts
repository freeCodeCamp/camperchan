import { Octokit } from "@octokit/rest";
import { Client } from "discord.js";

import { IntentOptions } from "./config/IntentOptions";
import { connectDatabase } from "./database/connectDatabase";
import { registerEvents } from "./events/registerEvents";
import { ExtendedClient } from "./interfaces/ExtendedClient";
import { generateConfig } from "./modules/generateConfig";
import { loadCommands } from "./utils/loadCommands";
import { loadContexts } from "./utils/loadContexts";
import { loadQuotes } from "./utils/loadQuotes";
import { registerCommands } from "./utils/registerCommands";

(async () => {
  const Bot = new Client({
    intents: IntentOptions
  }) as ExtendedClient;
  Bot.config = generateConfig();
  Bot.octokit = new Octokit({
    auth: Bot.config.githubToken
  });
  await connectDatabase(Bot);
  await registerEvents(Bot);
  Bot.commands = await loadCommands(Bot);
  Bot.contexts = await loadContexts(Bot);
  await registerCommands(Bot);
  Bot.quotes = await loadQuotes(Bot);
  Bot.privateLogs = {};
  Bot.learnAccounts = {};

  await Bot.login(Bot.config.token);
})();

import { Octokit } from "@octokit/rest";
import { Client } from "discord.js";

import { IntentOptions } from "./config/IntentOptions.js";
import { connectDatabase } from "./database/connectDatabase.js";
import { registerEvents } from "./events/registerEvents.js";
import { ExtendedClient } from "./interfaces/ExtendedClient.js";
import { generateConfig } from "./modules/generateConfig.js";
import { loadCommands } from "./utils/loadCommands.js";
import { loadContexts } from "./utils/loadContexts.js";
import { loadQuotes } from "./utils/loadQuotes.js";
import { registerCommands } from "./utils/registerCommands.js";

(async () => {
  const CamperChan = new Client({
    intents: IntentOptions
  }) as ExtendedClient;
  CamperChan.config = generateConfig();
  CamperChan.octokit = new Octokit({
    auth: CamperChan.config.githubToken
  });
  await connectDatabase(CamperChan);
  await registerEvents(CamperChan);
  CamperChan.commands = await loadCommands(CamperChan);
  CamperChan.contexts = await loadContexts(CamperChan);
  await registerCommands(CamperChan);
  CamperChan.quotes = await loadQuotes(CamperChan);
  CamperChan.privateLogs = {};
  CamperChan.learnAccounts = {};

  await CamperChan.login(CamperChan.config.token);
})();

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

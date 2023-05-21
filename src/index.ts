import { Client } from "discord.js";
import { IntentOptions } from "./config/IntentOptions";
import { Camperbot } from "./interfaces/Camperbot";

import { connectDatabase } from "./database/connectDatabase";
import { registerEvents } from "./events/registerEvents";
import { generateConfig } from "./modules/generateConfig";
import { loadCommands } from "./utils/loadCommands";
import { loadContexts } from "./utils/loadContexts";
import { loadQuotes } from "./utils/loadQuotes";
import { registerCommands } from "./utils/registerCommands";
import { wrapCommands } from "./utils/wrapCommands";

(async () => {
  const Bot = new Client({
    intents: IntentOptions,
  }) as Camperbot;
  Bot.config = generateConfig();
  await connectDatabase(Bot);
  await registerEvents(Bot);
  Bot.commands = wrapCommands(await loadCommands(Bot));
  Bot.contexts = await loadContexts(Bot);
  await registerCommands(Bot);
  Bot.quotes = await loadQuotes(Bot);
  Bot.private_logs = {};

  await Bot.login(Bot.config.token);
})();

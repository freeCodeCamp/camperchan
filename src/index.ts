import { Translator } from "deepl-node";
import { Client } from "discord.js";
import { App } from "octokit";
import { intentOptions } from "./config/intentOptions.js";
import { connectDatabase } from "./database/connectDatabase.js";
import { registerEvents } from "./events/registerEvents.js";
import { generateConfig } from "./modules/generateConfig.js";
import { loadCommands } from "./utils/loadCommands.js";
import { loadContexts } from "./utils/loadContexts.js";
import { loadQuotes } from "./utils/loadQuotes.js";
import { registerCommands } from "./utils/registerCommands.js";
import type { ExtendedClient } from "./interfaces/extendedClient.js";

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const camperChan = new Client({
  intents: intentOptions,
}) as ExtendedClient;
camperChan.config = generateConfig();
const app = new App({
  appId:      camperChan.config.githubAppId,
  privateKey: camperChan.config.githubToken,
});
camperChan.octokit = await app.getInstallationOctokit(
  camperChan.config.githubInstallationId,
);
await connectDatabase(camperChan);
await registerEvents(camperChan);
camperChan.commands = await loadCommands(camperChan);
camperChan.contexts = await loadContexts(camperChan);
await registerCommands(camperChan);
camperChan.quotes = await loadQuotes(camperChan);
camperChan.privateLogs = {};
camperChan.learnAccounts = {};
camperChan.translator = new Translator(process.env.TRANS_KEY ?? "");

await camperChan.login(camperChan.config.token);

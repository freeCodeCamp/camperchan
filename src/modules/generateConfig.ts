import { WebhookClient } from "discord.js";
import type { ExtendedClient } from "../interfaces/extendedClient.js";

/**
 * Bootstraps the config from the ENV into the camperChan's instance.
 * @returns The camperChan's config.
 * @throws An error when any configs are missing.
 */
export const generateConfig = (): ExtendedClient["config"] => {
  if (
    process.env.TOKEN === undefined
    || process.env.MONGO_URI === undefined
    || process.env.DEBUG_HOOK === undefined
    || process.env.MOD_HOOK === undefined
    || process.env.MESSAGE_HOOK === undefined
    || process.env.HOME_GUILD === undefined
    || process.env.BOT_ID === undefined
    || process.env.REPORT_CHANNEL === undefined
    || process.env.WELCOME_HOOK === undefined
    || process.env.GITHUB_APP_ID === undefined
    || process.env.GITHUB_TOKEN === undefined
    || process.env.GITHUB_INSTALLATION_ID === undefined
    || process.env.GHOST_KEY === undefined
    || process.env.STARBOARD_HOOK === undefined
  ) {
    throw new Error("Missing required config variables");
  }
  return {
    botId:       process.env.BOT_ID,
    debugHook:   new WebhookClient({ url: process.env.DEBUG_HOOK }),
    ghostKey:    process.env.GHOST_KEY,
    githubAppId: Number.parseInt(process.env.GITHUB_APP_ID, 10),
    githubInstallationId:
      Number.parseInt(process.env.GITHUB_INSTALLATION_ID, 10),
    githubToken:     process.env.GITHUB_TOKEN,
    homeGuild:       process.env.HOME_GUILD,
    messageHook:     new WebhookClient({ url: process.env.MESSAGE_HOOK }),
    modHook:         new WebhookClient({ url: process.env.MOD_HOOK }),
    modRole:         process.env.MOD_ROLE ?? "no role set",
    mongoUrl:        process.env.MONGO_URI,
    privateCategory: process.env.PRIVATE_CATEGORY ?? "no category set",
    reportChannel:   process.env.REPORT_CHANNEL,
    starboardHook:   new WebhookClient({ url: process.env.STARBOARD_HOOK }),
    token:           process.env.TOKEN,
    welcomeHook:     new WebhookClient({ url: process.env.WELCOME_HOOK }),
  };
};

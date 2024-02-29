import { WebhookClient } from "discord.js";

import { Camperbot } from "../interfaces/Camperbot";

/**
 * Bootstraps the config from the ENV into the Bot's instance.
 *
 * @returns {Camperbot["config"]} The bot's config.
 */
export const generateConfig = (): Camperbot["config"] => {
  if (
    !process.env.TOKEN ||
    !process.env.MONGO_URI ||
    !process.env.DEBUG_HOOK ||
    !process.env.MOD_HOOK ||
    !process.env.MESSAGE_HOOK ||
    !process.env.HOME_GUILD ||
    !process.env.BOT_ID ||
    !process.env.REPORT_CHANNEL ||
    !process.env.WELCOME_HOOK ||
    !process.env.GITHUB_TOKEN
  ) {
    throw new Error("Missing required config variables");
  }
  return {
    token: process.env.TOKEN,
    mongoUrl: process.env.MONGO_URI,
    debugHook: new WebhookClient({ url: process.env.DEBUG_HOOK }),
    modHook: new WebhookClient({ url: process.env.MOD_HOOK }),
    messageHook: new WebhookClient({ url: process.env.MESSAGE_HOOK }),
    welcomeHook: new WebhookClient({ url: process.env.WELCOME_HOOK }),
    homeGuild: process.env.HOME_GUILD,
    botId: process.env.BOT_ID,
    modRole: process.env.MOD_ROLE || "no role set",
    privateCategory: process.env.PRIVATE_CATEGORY || "no category set",
    reportChannel: process.env.REPORT_CHANNEL,
    githubToken: process.env.GITHUB_TOKEN
  };
};

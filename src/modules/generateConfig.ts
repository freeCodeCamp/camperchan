import { WebhookClient } from "discord.js";

import { Camperbot } from "../interfaces/Camperbot";

/**
 * Bootstraps the config from the ENV into the Bot's instance.
 *
 * @returns The bot's config.
 */
export const generateConfig = (): Camperbot["config"] => {
  if (!process.env.TOKEN) {
    throw new Error("Missing TOKEN");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("Missing MONGO_URI");
  }

  if (!process.env.DEBUG_HOOK) {
    throw new Error("Missing DEBUG_HOOK");
  }

  if (!process.env.MOD_HOOK) {
    throw new Error("Missing MOD_HOOK");
  }

  if (!process.env.HOME_GUILD) {
    throw new Error("Missing HOME_GUILD");
  }

  if (!process.env.BOT_ID) {
    throw new Error("Missing BOT_ID");
  }

  if (!process.env.REPORT_CHANNEL) {
    throw new Error("Missing REPORT_CHANNEL");
  }

  if (!process.env.WELCOME_HOOK) {
    throw new Error("Missing WELCOME_HOOK");
  }

  return {
    token: process.env.TOKEN,
    mongo_uri: process.env.MONGO_URI,
    debug_hook: new WebhookClient({ url: process.env.DEBUG_HOOK }),
    mod_hook: new WebhookClient({ url: process.env.MOD_HOOK }),
    welcome_hook: new WebhookClient({ url: process.env.WELCOME_HOOK }),
    home_guild: process.env.HOME_GUILD,
    bot_id: process.env.BOT_ID,
    mod_role: process.env.MOD_ROLE || "no role set",
    private_category: process.env.PRIVATE_CATEGORY || "no category set",
    report_channel: process.env.REPORT_CHANNEL,
  };
};

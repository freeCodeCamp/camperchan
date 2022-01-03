import { Client, Snowflake, WebhookClient } from "discord.js";

import { Command } from "./Command";
import { Context } from "./Context";
import { QuoteList } from "./Quotes";

export interface Camperbot extends Client {
  config: {
    token: string;
    mongo_uri: string;
    debug_hook: WebhookClient;
    mod_hook: WebhookClient;
    home_guild: Snowflake;
    bot_id: Snowflake;
    mod_role: Snowflake;
    private_category: Snowflake;
  };
  quotes: QuoteList;
  commands: Command[];
  contexts: Context[];
  private_logs: { [key: string]: string };
}

import { Octokit } from "@octokit/rest";
import { PrismaClient } from "@prisma/client";
import {
  CategoryChannel,
  Client,
  Guild,
  Snowflake,
  TextBasedChannel,
  WebhookClient,
} from "discord.js";

import { Context } from "./Context";
import { QuoteList } from "./Quotes";
import { WrappedCommand } from "./WrappedCommand";

export interface Camperbot extends Client {
  config: {
    token: string;
    mongo_uri: string;
    debug_hook: WebhookClient;
    message_hook: WebhookClient;
    mod_hook: WebhookClient;
    welcome_hook: WebhookClient;
    home_guild: Snowflake;
    bot_id: Snowflake;
    mod_role: Snowflake;
    private_category: Snowflake;
    report_channel: Snowflake;
    githubToken: string;
  };
  octokit: Octokit;
  quotes: QuoteList;
  commands: WrappedCommand[];
  contexts: Context[];
  private_logs: { [key: string]: string };
  db: PrismaClient;
  homeGuild: Guild;
  reportChannel: TextBasedChannel;
  privateCategory: CategoryChannel;
}

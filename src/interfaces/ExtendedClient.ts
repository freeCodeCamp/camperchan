import { Octokit } from "@octokit/rest";
import { PrismaClient } from "@prisma/client";
import {
  CategoryChannel,
  Client,
  Guild,
  Snowflake,
  TextBasedChannel,
  WebhookClient
} from "discord.js";

import { Command } from "./Command.js";
import { Context } from "./Context.js";
import { QuoteList } from "./Quotes.js";
import { UserRecord } from "./UserRecord.js";

export interface ExtendedClient extends Client {
  config: {
    token: string;
    mongoUrl: string;
    debugHook: WebhookClient;
    messageHook: WebhookClient;
    modHook: WebhookClient;
    welcomeHook: WebhookClient;
    homeGuild: Snowflake;
    botId: Snowflake;
    modRole: Snowflake;
    privateCategory: Snowflake;
    reportChannel: Snowflake;
    githubToken: string;
    ghostKey: string;
  };
  octokit: Octokit;
  quotes: QuoteList;
  commands: Command[];
  contexts: Context[];
  privateLogs: { [key: string]: string };
  db: PrismaClient;
  homeGuild: Guild;
  reportChannel: TextBasedChannel;
  privateCategory: CategoryChannel;
  learnAccounts: {
    [userId: string]: UserRecord & { cacheTTL: Date };
  };
  event?: {
    channelId: string;
    userIds: string[];
    start: number;
    end: number;
  };
}

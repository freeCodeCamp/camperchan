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

import { Command } from "./Command";
import { Context } from "./Context";
import { QuoteList } from "./Quotes";
import { UserRecord } from "./UserRecord";

export interface Camperbot extends Client {
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
}

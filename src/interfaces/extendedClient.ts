import type { Command } from "./command.js";
import type { Context } from "./context.js";
import type { QuoteList } from "./quotes.js";
import type { UserRecord } from "./userRecord.js";
import type { PrismaClient } from "@prisma/client";
import type { Translator } from "deepl-node";
import type {
  CategoryChannel,
  Client,
  Guild,
  GuildTextBasedChannel,
  Snowflake,
  WebhookClient,
} from "discord.js";
import type { App } from "octokit";

export interface ExtendedClient extends Client {
  config: {
    token:                string;
    mongoUrl:             string;
    debugHook:            WebhookClient;
    messageHook:          WebhookClient;
    modHook:              WebhookClient;
    welcomeHook:          WebhookClient;
    starboardHook:        WebhookClient;
    homeGuild:            Snowflake;
    botId:                Snowflake;
    modRole:              Snowflake;
    privateCategory:      Snowflake;
    reportChannel:        Snowflake;
    githubAppId:          number;
    githubToken:          string;
    githubInstallationId: number;
    ghostKey:             string;
  };
  octokit:         App["octokit"];
  quotes:          QuoteList;
  commands:        Array<Command>;
  contexts:        Array<Context>;
  privateLogs:     Record<string, string>;
  db:              PrismaClient;
  homeGuild:       Guild;
  reportChannel:   GuildTextBasedChannel;
  privateCategory: CategoryChannel;
  learnAccounts:   Record<string, UserRecord & { cacheTTL: Date }>;
  event?: {
    channelId: string;
    userIds:   Array<string>;
    start:     number;
    end:       number;
  };
  translator:  Translator;
  twitchCache: Record<string, string>;
}

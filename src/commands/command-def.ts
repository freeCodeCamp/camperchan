import { Message, Client } from 'discord.js';
import { Config } from '../config/get-config';
import { QuoteDef } from '../APIs/quote-def';

/**
 * Extra arguments passed to each command.
 */
export interface CommandDefArgs {
  client: Client;
  config: Config;
  quoteData: QuoteDef;
}

/**
 * Definition for a "prefix" command
 */
export interface CommandDef {
  prefix: string;
  description: string;
  usage: string;
  command: (message: Message, args: CommandDefArgs) => void;
}

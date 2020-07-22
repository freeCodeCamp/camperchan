import { Message, Client } from 'discord.js';
import { Config } from '../config/get-config';
import { quoteDef } from '../APIs/quote-def';

/**
 * Extra arguments passed to each command.
 */
export interface CommandDefArgs {
  client: Client;
  config: Config;
  quoteData: quoteDef;
}

/**
 * Definition for a "prefix" command
 */
export interface CommandDef {
  prefix: string;
  description: string;
  command: (message: Message, args: CommandDefArgs) => void;
}

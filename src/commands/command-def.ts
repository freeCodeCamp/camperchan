import { Message, Client } from 'discord.js';
import { Config } from '../config/get-config';

/**
 * Extra arguments passed to each command.
 */
export interface CommandDefArgs {
  client: Client;
  config: Config;
}

/**
 * Definition for a "prefix" command
 */
export interface CommandDef {
  prefix: string;
  description: string;
  command: (message: Message, args: CommandDefArgs) => void;
}

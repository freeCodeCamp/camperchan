import { Message, Client } from 'discord.js';

/**
 * Definition for a "prefix" command
 */
export interface CommandDef {
  prefix: string;
  description: string;
  command: (message: Message, client: Client) => void;
}

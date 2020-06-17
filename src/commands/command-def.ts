import { Message } from 'discord.js';

/**
 * Definition for a "prefix" command
 */
export interface CommandDef {
  prefix: string;
  description: string;
  command: (message: Message) => void;
}

import { MessageReaction, Client, User, PartialUser } from 'discord.js';
import { Config } from '../config/get-config';

/**
 * Extra arguments passed to each command.
 */
export interface ReactionDefArgs {
  client: Client;
  config: Config;
  user: User | PartialUser;
}
/**
 * A reaction def defines how to handle specific
 * emoji reactions on **any** message.
 */
export interface ReactionDef {
  emoji: string;
  /**
   * The description to display in the `help` command
   */
  description: string;
  command: (reaction: MessageReaction, args: ReactionDefArgs) => void;
}

import { MessageReaction } from 'discord.js';

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
  command: (reaction: MessageReaction) => void;
}

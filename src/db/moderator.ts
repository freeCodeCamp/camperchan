import { Snowflake } from 'discord.js';
import { Schema } from 'mongoose';

/**
 * A moderator is similar to a user, except
 * we **do not** keep track of previous usernames
 * or nicknames.
 *
 * This isn't saved by itself, rather it is used to "log"
 * actions taken by an admin.
 */
export interface Moderator {
  /**
   * The discord server userId for the mod
   */
  userId: string | Snowflake;
  /**
   * The discord server nickname of the mod
   */
  username: string;
  /**
   * The discord server nickname of the mod
   */
  nickname: string;
}

export const moderatorSchema = new Schema(
  {
    userId: {
      type: Schema.Types.String,
      required: true,
      immutable: true
      // TODO: Add length validation check
    },
    username: {
      type: Schema.Types.String,
      required: true,
      immutable: true
      // TODO: Add entry limitations, check discord api
    },
    nickname: {
      type: Schema.Types.String,
      required: true,
      immutable: true
      // TODO: Add entry limitations, check discord api
    }
  },
  { _id: false }
);

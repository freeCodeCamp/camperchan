import { Snowflake } from 'discord.js';
import { Document, Schema } from 'mongoose';
import { Collections } from './collections';
import { Moderator, moderatorSchema } from './moderator';

/**
 * A user-log is used to keep track of things saved
 * by admins via the `userlog` command
 */
export interface UserLog extends Document {
  /**
   * The parent user
   *
   * **NOTE** I'm unsure if we should keep this as the objectId reference
   * or use the discord provided snowflake
   *
   * The discord user's _id
   */
  user: Snowflake;
  /**
   * The reason the user was suspended.
   */
  reason: string;
  /**
   * The moderator who performed this action
   */
  moderator: Moderator;
  /**
   * The date and time this entry was saved
   */
  createdAt: Date;
}

export const userLogSchema = new Schema(
  {
    user: {
      type: Schema.Types.String,
      required: true,
      immutable: true,
      ref: Collections.USER
    },
    message: {
      type: Schema.Types.String,
      required: true,
      immutable: true
    },
    moderator: moderatorSchema
  },
  {
    timestamps: {
      createdAt: 'createdAt'
    }
  }
);

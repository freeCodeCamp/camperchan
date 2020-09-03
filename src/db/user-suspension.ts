import { Snowflake } from 'discord.js';
import { Document, Schema } from 'mongoose';
import { Collections } from './collections';
import { Moderator, moderatorSchema } from './moderator';

/**
 * A user-suspension is used to keep track of suspensions
 * made on a user by admins.
 */
export interface UserSuspension extends Document {
  /**
   * The parent user
   *
   * **NOTE** I'm unsure if we should keep this as the objectId reference
   * or use the discord provided snowflake
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

export const userSuspensionSchema = new Schema(
  {
    user: {
      type: Schema.Types.String,
      required: true,
      immutable: true,
      ref: Collections.USER
    },
    reason: {
      type: Schema.Types.String
      // TODO: add default
      // TODO: add length
    },
    moderator: moderatorSchema
  },
  {
    timestamps: {
      createdAt: 'createdAt'
    }
  }
);

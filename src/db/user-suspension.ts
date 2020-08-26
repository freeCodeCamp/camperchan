import { Moderator, moderatorSchema } from './moderator';
import { Schema, Document } from 'mongoose';
import { User } from 'discord.js';
import { ObjectId } from 'mongodb';
import { Collections } from './collections';

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
  user: string | ObjectId | User;
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
      type: Schema.Types.ObjectId,
      required: true,
      immutable: true,
      ref: Collections.USER_SUSPENSIONS
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

import { Document, Schema } from 'mongoose';
import { User } from './user';
import { ObjectId } from 'mongodb';
import { Moderator, moderatorSchema } from './moderator';
import { Collections } from './collections';

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

export const userLogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
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

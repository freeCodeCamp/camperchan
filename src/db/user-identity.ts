import { Schema } from 'mongoose';

/**
 * A user-identity is an entry saved
 * for any changes related to a discord user-name for a
 * given discord user. This is used to keep track
 * of user information in-case they change their name/username
 */
export interface UserIdentity {
  /**
   * The discord username.
   */
  username: string;
  /**
   * The discord server nickname.
   */
  nickname: string;
  /**
   * The date and time this entry was saved
   */
  createdAt: Date;
}

export const userIdentitySchema = new Schema(
  {
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
  {
    _id: false,
    timestamps: {
      createdAt: 'createdAt'
    }
  }
);

import { Snowflake } from 'discord.js';
import { Document, Schema } from 'mongoose';
import { UserIdentity, userIdentitySchema } from './user-identity';
/**
 * This is an entry for a user, this is normalized
 * for "future" proofing future features that will
 * deal with the discord-user.
 */
export interface User extends Document {
  /**
   * The discord user's _id
   */
  _id: Snowflake;
  /**
   * List of previous "identity" information
   * for a given user. Used to keep track of
   * users incase they change their discord user name.
   */
  identities: Array<UserIdentity>;
}

export const userSchema = new Schema(
  {
    _id: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      immutable: true
      // TODO: Add length validation check, is it 17 or 18???
      // See snowflake documentation: https://discord.com/developers/docs/reference#snowflakes
    },
    identities: [userIdentitySchema]
  },
  {
    timestamps: {
      createdAt: 'createdAt'
    }
  }
);

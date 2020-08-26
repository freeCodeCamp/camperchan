import { ObjectId } from 'mongodb';
import { UserIdentity, userIdentitySchema } from './user-identity';
import { Schema, Document } from 'mongoose';
/**
 * This is an entry for a user, this is normalized
 * for "future" proofing future features that will
 * deal with the discord-user.
 */
export interface User extends Document {
  /**
   * The discord server userId
   */
  userId: string | ObjectId;
  /**
   * List of previous "identity" information
   * for a given user. Used to keep track of
   * users incase they change their discord user name.
   */
  identities: Array<UserIdentity>;
}

export const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      // this isn't "seen" by types and available after 5.6
      immutable: true
      // TODO: Add length validation check
    },
    identities: [userIdentitySchema]
  },
  {
    timestamps: {
      createdAt: 'createdAt'
    }
  }
);

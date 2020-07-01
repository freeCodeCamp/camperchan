import { Document, Schema, model } from 'mongoose';

export interface userSuspend extends Document {
  userid: string;
  suspended: boolean;
}

export const userSchema = new Schema({
  userid: String,
  suspended: Boolean
});

export const userStatus = model<userSuspend>('user', userSchema);

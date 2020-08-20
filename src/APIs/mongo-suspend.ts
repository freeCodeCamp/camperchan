import { Document, Schema, model } from 'mongoose';

export interface UserSuspend extends Document {
  userId: string;
  currentUsername: string;
  currentNickname: string;
  suspended: ReasonInt[];
}

export const userSuspendSchema = new Schema({
  userId: String,
  currentUsername: String,
  currentNickname: String,
  suspended: Array
});

interface ReasonInt {
  date: string;
  mod: string;
  reason: string;
}

export const userSuspendModel = model<UserSuspend>('user', userSuspendSchema);

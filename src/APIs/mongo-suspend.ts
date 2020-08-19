import { Document, Schema, model } from 'mongoose';

export interface UserSuspend extends Document {
  userId: string;
  suspended: ReasonInt[];
}

export const userSuspendSchema = new Schema({
  userId: String,
  suspended: Array
});

interface ReasonInt {
  date: string;
  reason: string;
}

export const userSuspendModel = model<UserSuspend>('user', userSuspendSchema);

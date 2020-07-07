import { Document, Schema, model } from 'mongoose';

export interface UserSuspend extends Document {
  userId: string;
  suspended: boolean;
}

export const userSuspendSchema = new Schema({
  userId: String,
  suspended: Boolean
});

export const userSuspendModel = model<UserSuspend>('user', userSuspendSchema);

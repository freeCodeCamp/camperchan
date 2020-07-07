import { Document, Schema, model } from 'mongoose';

export interface UserSuspend extends Document {
  userId: string;
  suspended: boolean;
}

export const userSchema = new Schema({
  userId: String,
  suspended: Boolean
});

export const userModel = model<UserSuspend>('user', userSchema);

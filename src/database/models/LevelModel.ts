import { Document, model, Schema } from "mongoose";

export interface Level extends Document {
  userId: string;
  userTag: string;
  points: number;
  level: number;
  lastSeen: Date;
  cooldown: number;
}

export const LevelSchema = new Schema({
  userId: String,
  userTag: String,
  points: Number,
  level: Number,
  lastSeen: Date,
  cooldown: Number,
});

export default model<Level>("newLevel", LevelSchema);

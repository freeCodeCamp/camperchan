import { Document, model, Schema } from "mongoose";

export interface History extends Document {
  userId: string;
  bans: number;
  kicks: number;
  mutes: number;
  unmutes: number;
  warns: number;
  unbans: number;
}

export const HistorySchema = new Schema({
  userId: String,
  bans: Number,
  kicks: Number,
  mutes: Number,
  unmutes: Number,
  warns: Number,
  unbans: Number,
});

export default model<History>("history", HistorySchema);

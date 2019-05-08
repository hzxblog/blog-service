import * as mongoose from 'mongoose';

export const TagSchema = new mongoose.Schema({
  name: String,
  created_time: { type: Number, default: Date.now() },
}, { versionKey: false });

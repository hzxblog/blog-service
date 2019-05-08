import * as mongoose from 'mongoose';

export const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  tag: String,
  watcher: { type: Number, default: 0 },
  is_publish: Boolean,
  created_time: { type: Number, default: Date.now() },
}, { versionKey: false });

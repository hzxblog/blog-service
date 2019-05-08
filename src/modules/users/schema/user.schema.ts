import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  name: String,
  address: String,
  work_years: Number,
  phone: Number,
  age: Number,
  created_time: { type: Number, default: Date.now() },
}, { versionKey: false });

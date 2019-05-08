import { Document } from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly email: string;
  readonly role: string;
  readonly password: string;
}

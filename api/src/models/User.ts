import { Schema, model, Document } from 'mongoose';
import { User } from '../interfaces/models';

export interface IUser extends User, Document {}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['admin','user'], default: 'user' }
}, {
  timestamps: true
});

export const UserModel = model<IUser>('User', UserSchema);

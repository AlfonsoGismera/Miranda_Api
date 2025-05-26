import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI!;
export async function connectDb() {
  await mongoose.connect(uri, { });
  console.log('⚡ Connected to MongoDB');
}

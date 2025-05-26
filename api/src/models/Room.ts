import { Schema, model, Document } from 'mongoose';
import { Room } from '../interfaces/models';

// 1) Define una interfaz que extienda Document + tu Room
export interface IRoom extends Room, Document {}

// 2) Crea el Schema
const RoomSchema = new Schema<IRoom>({
  roomId:    { type: String, required: true, unique: true },
  roomName:  { type: String, required: true },
  bedType:   { type: String, required: true },
  roomFloor: { type: String, required: true },
  facilities:[{ type: String }],
  rate:      { type: String, required: true },
  status:    { 
    type: String,
    enum: ['Available','Booked','Maintenance','Out of Service'],
    default: 'Available'
  },
  image:     { type: String }
});

// 3) Exporta el model
export const RoomModel = model<IRoom>('Room', RoomSchema);

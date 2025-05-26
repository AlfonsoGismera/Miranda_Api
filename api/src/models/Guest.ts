import { Schema, model, Document } from 'mongoose';
import { Guest } from '../interfaces/models';

export interface IGuest extends Guest, Document {}

const GuestSchema = new Schema<IGuest>({
  guest:          { type: String, required: true },
  reservationId:  { type: String, required: true, unique: true },
  orderDate:      { type: String, required: true },
  checkIn:        { type: String, required: true },
  checkOut:       { type: String, required: true },
  specialRequest: { type: String },
  roomType:       { type: String, required: true },
  status:         { 
    type: String, 
    enum: ['Checked In','Pending','Booked','Cancelled','Refunded'], 
    default: 'Pending' 
  },
  email:          { type: String, required: true },
  phone:          { type: String, required: true },
  image:          { type: String }
});

export const GuestModel = model<IGuest>('Guest', GuestSchema);

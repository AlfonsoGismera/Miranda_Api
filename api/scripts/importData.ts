import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

// Importa tus modelos Mongoose
import { EmployeeModel } from '../src/models/Employee';
import { GuestModel }    from '../src/models/Guest';
import { RoomModel }     from '../src/models/Room';

async function loadJson<T>(filename: string): Promise<T[]> {
  const filePath = path.join(__dirname, '../src/data', filename);
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as T[];
}

async function importData() {
  // 1) Conecta a Mongo
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI no está definido en .env');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI);

  // 2) Borra colecciones existentes
  await Promise.all([
    EmployeeModel.deleteMany({}),
    GuestModel.deleteMany({}),
    RoomModel.deleteMany({}),
  ]);

  // 3) Lee los JSON y los inserta
  // 3a) Empleados
  const employees = await loadJson<{ 
    employeeId: string;
    name: string;
    image: string;
    jobDesk: string;
    schedule: string[];
    hireDate: string;
    contact: string;
    status: 'Active' | 'Inactive';
  }>('employees.json');

  await EmployeeModel.insertMany(employees);
  console.log(`✅ Insertados ${employees.length} empleados`);

  // 3b) Huéspedes
  const guests = await loadJson<{
    guest: string;
    reservationId: string;
    orderDate: string;
    checkIn: string;
    checkOut: string;
    specialRequest: string;
    roomType: string;
    status: 'Checked In' | 'Pending' | 'Booked' | 'Cancelled' | 'Refunded';
    email: string;
    phone: string;
    image: string;
  }>('guests.json');

  await GuestModel.insertMany(guests);
  console.log(`✅ Insertados ${guests.length} huéspedes`);

  // 3c) Habitaciones
  const rooms = await loadJson<{
    roomId: string;
    roomName: string;
    bedType: string;
    roomFloor: string;
    facilities: string[];
    rate: string;
    status: 'Available' | 'Booked' | 'Maintenance' | 'Out of Service';
    image: string;
  }>('roomList.json');

  await RoomModel.insertMany(rooms);
  console.log(`✅ Insertadas ${rooms.length} habitaciones`);

  // 4) Cierra la conexión
  await mongoose.disconnect();
  console.log('✔️ Importación finalizada');
  process.exit(0);
}

importData().catch(err => {
  console.error(err);
  process.exit(1);
});

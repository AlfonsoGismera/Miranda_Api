// scripts/seed.ts
import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { connectDb } from '../src/db';
import { EmployeeModel } from '../src/models/Employee';
import { GuestModel } from '../src/models/Guest';
import { RoomModel } from '../src/models/Room';
import { UserModel } from '../src/models/User';

async function seed() {
  await connectDb();

  // Limpia colecciones
  await Promise.all([
    EmployeeModel.deleteMany({}),
    GuestModel.deleteMany({}),
    RoomModel.deleteMany({}),
    UserModel.deleteMany({}),
  ]);

  // Empleados
  for (let i = 0; i < 10; i++) {
    await EmployeeModel.create({
      employeeId: `EMP${String(100 + i)}`,
      name: faker.person.fullName(),
      image: faker.image.avatar(),
      jobDesk: faker.name.jobTitle(),
      schedule: faker.helpers.arrayElements(['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], 2),
      hireDate: faker.date.past({ years: 5 }).toISOString(),
      contact: faker.phone.number(),
      status: faker.helpers.arrayElement(['Active','Inactive']),
    });
  }

  // Huéspedes
  for (let i = 0; i < 10; i++) {
    const reservationId = `U${String(100 + i)}`;
    await GuestModel.create({
      guest: faker.person.fullName(),
      reservationId,
      orderDate: faker.date.past().toISOString(),
      checkIn: faker.date.future().toISOString(),
      checkOut: faker.date.future({ years: 1 }).toISOString(),
      specialRequest: faker.lorem.sentence(),
      roomType: `${faker.helpers.arrayElement(['Deluxe','Standard','Suite'])} ${faker.number.int({ min:1, max:10 })}`,
      status: faker.helpers.arrayElement(['Checked In','Pending','Booked','Cancelled','Refunded']),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      image: faker.image.avatar(),
    });
  }

  // Habitaciones
  for (let i = 0; i < 10; i++) {
    await RoomModel.create({
      roomId: `R${String(i + 1).padStart(3,'0')}`,
      roomName: faker.commerce.productName(),
      bedType: faker.helpers.arrayElement(['Single','Double','Queen','King']),
      roomFloor: `Floor ${faker.number.int({ min:1, max:5 })}`,
      facilities: faker.helpers.arrayElements(['Wi-Fi','TV','AC','Mini Bar','Safe'], 3),
      rate: `$${faker.number.int({ min:50, max:200 })}/Night`,
      status: faker.helpers.arrayElement(['Available','Booked','Maintenance','Out of Service']),
      image: faker.image.urlLoremFlickr({ category: 'hotel', width: 640, height: 480 }),
    });
  }

  // Usuario admin
  const passHash = await bcrypt.hash('password123', 10);
  await UserModel.create({
    username: 'admin',
    password: passHash,
    role: 'admin',
  });

  // Log final
  console.log('🌱 Seed completed:');
  console.log(`Employees: ${await EmployeeModel.countDocuments()}`);
  console.log(`Guests: ${await GuestModel.countDocuments()}`);
  console.log(`Rooms: ${await RoomModel.countDocuments()}`);
  console.log(`Users: ${await UserModel.countDocuments()}`);

  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});

export interface Room {
  roomId: string;
  roomName: string;
  bedType: string;
  roomFloor: string;
  facilities: string[];
  rate: string;
  status: 'Available' | 'Booked' | 'Maintenance' | 'Out of Service';
  image: string;
}
export interface Employee {
  employeeId: string;
  name: string;
  image: string;
  jobDesk: string;
  schedule: string[];  
  hireDate: string;
  contact: string;
  status: 'Active' | 'Inactive';
}
export interface Guest {
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
}
export interface User {
  username: string;
  password: string; 
  role: 'admin' | 'user';
}

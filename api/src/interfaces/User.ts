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
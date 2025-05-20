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
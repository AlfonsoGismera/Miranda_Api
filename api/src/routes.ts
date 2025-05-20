// src/routes.ts
import express from 'express';
import { login } from './controllers/authController';
import { checkToken } from './middleware/auth';
import * as employeeCtrl from './controllers/employeeController';
import * as guestCtrl from './controllers/guestController';
import * as roomCtrl from './controllers/roomController';

const router = express.Router();

// Public endpoint: API info
router.get('/', (req, res) => {
  res.json({
    hotel: process.env.HOTEL_NAME,
    endpoints: [
      { method: 'POST', path: '/login' },
      { method: 'GET', path: '/employees' },
      { method: 'GET', path: '/employees/:id' },
      { method: 'GET', path: '/guests' },
      { method: 'GET', path: '/guests/:id' },
      { method: 'GET', path: '/rooms' },
      { method: 'GET', path: '/rooms/:id' }
    ],
  });
});

// Authentication
router.post('/login', login);

// Protect all routes below
router.use(checkToken);

// Employees routes
router.get('/employees', employeeCtrl.getEmployees);
router.get('/employees/:id', employeeCtrl.getEmployee);
router.post('/employees', employeeCtrl.createEmployee);
router.put('/employees/:id', employeeCtrl.updateEmployeeCtrl);
router.delete('/employees/:id', employeeCtrl.deleteEmployeeCtrl);

// Guests routes
router.get('/guests', guestCtrl.getGuests);
router.get('/guests/:id', guestCtrl.getGuest);
router.post('/guests', guestCtrl.createGuest);
router.put('/guests/:id', guestCtrl.updateGuestCtrl);
router.delete('/guests/:id', guestCtrl.deleteGuestCtrl);

// Rooms routes
router.get('/rooms', roomCtrl.getRooms);
router.get('/rooms/:id', roomCtrl.getRoom);
router.post('/rooms', roomCtrl.createRoom);
router.put('/rooms/:id', roomCtrl.updateRoomCtrl);
router.delete('/rooms/:id', roomCtrl.deleteRoomCtrl);

export default router;

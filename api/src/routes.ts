import { Router } from 'express';
import * as employeeCtrl from './controllers/employeeController';
import * as guestCtrl from './controllers/guestController';
import * as roomCtrl from './controllers/roomController';
import { checkToken } from './middleware/auth';

const router = Router();

// Public info
router.get('/', (req, res) => {
  res.json({
    hotel: process.env.HOTEL_NAME,
    endpoints: [
      { method: 'GET', path: '/employees' },
      { method: 'GET', path: '/guests' },
      { method: 'GET', path: '/rooms' }
    ]
  });
});

// Authentication routes (implement login separately)
import * as authCtrl from './controllers/authController';
router.post('/login', authCtrl.login);

// Protected routes
router.use(checkToken);

// Employees
router.get('/employees', employeeCtrl.getEmployees);
router.get('/employees/:id', employeeCtrl.getEmployee);
router.post('/employees', employeeCtrl.createEmployee);
router.put('/employees/:id', employeeCtrl.updateEmployeeCtrl);
router.delete('/employees/:id', employeeCtrl.deleteEmployeeCtrl);

// Guests
router.get('/guests', guestCtrl.getGuests);
router.get('/guests/:id', guestCtrl.getGuest);
router.post('/guests', guestCtrl.createGuest);
router.put('/guests/:id', guestCtrl.updateGuestCtrl);
router.delete('/guests/:id', guestCtrl.deleteGuestCtrl);

// Rooms
router.get('/rooms', roomCtrl.getRooms);
router.get('/rooms/:id', roomCtrl.getRoom);
router.post('/rooms', roomCtrl.createRoom);
router.put('/rooms/:id', roomCtrl.updateRoomCtrl);
router.delete('/rooms/:id', roomCtrl.deleteRoomCtrl);

export default router;

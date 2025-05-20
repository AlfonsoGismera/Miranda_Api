import { Router } from 'express';
// import * as authCtrl from './controllers/auth';
// import * as roomCtrl from './controllers/room';
// …otros controladores

const router = Router();

// Ruta pública
router.get('/', (req, res) => {
  res.json({
    name: process.env.HOTEL_NAME,
    version: '1.0.0',
    endpoints: [
      { path: '/rooms', method: 'GET', private: true },
      // …
    ],
  });
});

// Rutas de autenticación (login)
// router.post('/login', authCtrl.login);

// Middleware de JWT para proteger lo que viene después
// import { checkToken } from './middleware/auth';
// router.use(checkToken);

// Rutas privadas
// router.get('/rooms', roomCtrl.getRooms);
// …

export default router;

import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (_req, res) => {
  res.send('Bienvenido a Trav Hotel API — prueba GET /api/');
});
app.use('/api', routes);
export default app;

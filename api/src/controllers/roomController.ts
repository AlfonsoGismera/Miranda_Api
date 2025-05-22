import { RequestHandler } from 'express';
import { roomService } from '../services/services';
import { Room } from '../interfaces/models';

/**
 * @openapi
 * /rooms:
 *   get:
 *     summary: Obtener todas las habitaciones
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de habitaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Room'
 */
export const getRooms: RequestHandler = async (req, res) => {
  const list = await roomService.fetchAll();
  res.json(list);
};

/**
 * @openapi
 * /rooms/{id}:
 *   get:
 *     summary: Obtener una habitación por ID
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la habitación
 *     responses:
 *       '200':
 *         description: Detalles de la habitación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 *       '404':
 *         description: Habitación no encontrada
 */
export const getRoom: RequestHandler = async (req, res) => {
  const r = await roomService.fetchOne(req.params.id);
  if (!r) {
    res.sendStatus(404);
    return;
  }
  res.json(r);
};

/**
 * @openapi
 * /rooms:
 *   post:
 *     summary: Crear una nueva habitación
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       '201':
 *         description: Habitación creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 */
export const createRoom: RequestHandler = async (req, res) => {
  const data = req.body as Room;
  const created = await roomService.create(data);
  res.status(201).json(created);
};

/**
 * @openapi
 * /rooms/{id}:
 *   put:
 *     summary: Actualizar una habitación existente
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la habitación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Room'
 *     responses:
 *       '200':
 *         description: Habitación actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Room'
 */
export const updateRoomCtrl: RequestHandler = async (req, res) => {
  const data = req.body as Room;
  const updated = await roomService.update(data);
  res.json(updated);
};

/**
 * @openapi
 * /rooms/{id}:
 *   delete:
 *     summary: Eliminar una habitación
 *     tags:
 *       - Rooms
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la habitación a eliminar
 *     responses:
 *       '200':
 *         description: ID de la habitación eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Identificador eliminado
 */
export const deleteRoomCtrl: RequestHandler = async (req, res) => {
  const id = await roomService.remove(req.params.id);
  res.json({ id });
};

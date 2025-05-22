import { RequestHandler } from 'express';
import { guestService } from '../services/services';
import { Guest } from '../interfaces/models';

/**
 * @openapi
 * /guests:
 *   get:
 *     summary: Obtener todos los huéspedes
 *     tags:
 *       - Guests
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de huéspedes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Guest'
 */
export const getGuests: RequestHandler = async (req, res) => {
  const list = await guestService.fetchAll();
  res.json(list);
};

/**
 * @openapi
 * /guests/{id}:
 *   get:
 *     summary: Obtener un huésped por ID
 *     tags:
 *       - Guests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva (reservationId)
 *     responses:
 *       '200':
 *         description: Detalles del huésped
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Guest'
 *       '404':
 *         description: Huésped no encontrado
 */
export const getGuest: RequestHandler = async (req, res) => {
  const g = await guestService.fetchOne(req.params.id);
  if (!g) {
    res.sendStatus(404);
    return;
  }
  res.json(g);
};

/**
 * @openapi
 * /guests:
 *   post:
 *     summary: Crear un nuevo huésped
 *     tags:
 *       - Guests
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Guest'
 *     responses:
 *       '201':
 *         description: Huésped creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Guest'
 */
export const createGuest: RequestHandler = async (req, res) => {
  const data = req.body as Guest;
  const created = await guestService.create(data);
  res.status(201).json(created);
};

/**
 * @openapi
 * /guests/{id}:
 *   put:
 *     summary: Actualizar un huésped existente
 *     tags:
 *       - Guests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva (reservationId) a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Guest'
 *     responses:
 *       '200':
 *         description: Huésped actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Guest'
 */
export const updateGuestCtrl: RequestHandler = async (req, res) => {
  const data = req.body as Guest;
  const updated = await guestService.update(data);
  res.json(updated);
};

/**
 * @openapi
 * /guests/{id}:
 *   delete:
 *     summary: Eliminar un huésped
 *     tags:
 *       - Guests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva a eliminar
 *     responses:
 *       '200':
 *         description: ID del huésped eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Identificador eliminado
 */
export const deleteGuestCtrl: RequestHandler = async (req, res) => {
  const id = await guestService.remove(req.params.id);
  res.json({ id });
};

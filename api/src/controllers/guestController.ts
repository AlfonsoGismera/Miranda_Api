import { RequestHandler } from 'express';
import { guestService } from '../services/services';
import { Guest } from '../interfaces/models';

export const getGuests: RequestHandler = async (req, res) => {
  const list = await guestService.fetchAll();
  res.json(list);
};

export const getGuest: RequestHandler = async (req, res) => {
  const g = await guestService.fetchOne(req.params.id);
  if (!g) {
    res.sendStatus(404);
    return;
  }
  res.json(g);
  
};

export const createGuest: RequestHandler = async (req, res) => {
  const data = req.body as Guest;
  const created = await guestService.create(data);
  res.status(201).json(created);
};

export const updateGuestCtrl: RequestHandler = async (req, res) => {
  const data = req.body as Guest;
  const updated = await guestService.update(data);
  res.json(updated);
};

export const deleteGuestCtrl: RequestHandler = async (req, res) => {
  const id = await guestService.remove(req.params.id);
  res.json({ id });
};
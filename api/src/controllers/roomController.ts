import { RequestHandler } from 'express';
import { roomService } from '../services/services';
import { Room } from '../interfaces/models';

export const getRooms: RequestHandler = async (req, res) => {
  const list = await roomService.fetchAll();
  res.json(list);
};

export const getRoom: RequestHandler = async (req, res) => {
  const r = await roomService.fetchOne(req.params.id);
  if (!r) {
    res.sendStatus(404);
    return;
  }
  res.json(r);
};

export const createRoom: RequestHandler = async (req, res) => {
  const data = req.body as Room;
  const created = await roomService.create(data);
  res.status(201).json(created);
};

export const updateRoomCtrl: RequestHandler = async (req, res) => {
  const data = req.body as Room;
  const updated = await roomService.update(data);
  res.json(updated);
};

export const deleteRoomCtrl: RequestHandler = async (req, res) => {
  const id = await roomService.remove(req.params.id);
  res.json({ id });
};

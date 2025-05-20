import { Request, Response } from 'express';
import { roomService } from '../services/services';
import { Room } from '../interfaces/models';

export async function getRooms(req: Request, res: Response) {
  res.json(await roomService.fetchAll());
}
export async function getRoom(req: Request, res: Response) {
  const r = await roomService.fetchOne(req.params.id);
  if (!r) return res.sendStatus(404);
  res.json(r);
}
export async function createRoom(req: Request, res: Response) {
  const data: Room = req.body;
  res.status(201).json(await roomService.create(data));
}
export async function updateRoomCtrl(req: Request, res: Response) {
  const data: Room = req.body;
  res.json(await roomService.update(data));
}
export async function deleteRoomCtrl(req: Request, res: Response) {
  const id = await roomService.remove(req.params.id);
  res.json({ id });
}

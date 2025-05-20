import { Request, Response } from 'express';
import { guestService } from '../services/services';
import { Guest } from '../interfaces/models';

export async function getGuests(req: Request, res: Response) {
  res.json(await guestService.fetchAll());
}
export async function getGuest(req: Request, res: Response) {
  const g = await guestService.fetchOne(req.params.id);
  if (!g) return res.sendStatus(404);
  res.json(g);
}
export async function createGuest(req: Request, res: Response) {
  const data: Guest = req.body;
  res.status(201).json(await guestService.create(data));
}
export async function updateGuestCtrl(req: Request, res: Response) {
  const data: Guest = req.body;
  res.json(await guestService.update(data));
}
export async function deleteGuestCtrl(req: Request, res: Response) {
  const id = await guestService.remove(req.params.id);
  res.json({ id });
}
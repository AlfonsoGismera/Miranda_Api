import { IGuest, GuestModel } from '../models/Guest';

export const guestService = {
  async fetchAll(): Promise<IGuest[]> {
    return GuestModel.find().lean<IGuest[]>();
  },

  async fetchOne(id: string): Promise<IGuest | null> {
    return GuestModel.findOne({ reservationId: id }).lean();
  },

  async create(g: Partial<IGuest>): Promise<IGuest> {
    const created = await GuestModel.create(g);
    return created.toObject();
  },

  async update(g: IGuest): Promise<IGuest | null> {
    return GuestModel
      .findOneAndUpdate({ reservationId: g.reservationId }, g, { new: true })
      .lean();
  },

  async remove(id: string): Promise<string> {
    await GuestModel.findOneAndDelete({ reservationId: id });
    return id;
  },
};

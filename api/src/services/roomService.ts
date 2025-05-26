import { IRoom, RoomModel } from '../models/Room';

export const roomService = {
  async fetchAll(): Promise<IRoom[]> {
    return RoomModel.find().lean<IRoom[]>();
  },

  async fetchOne(id: string): Promise<IRoom | null> {
    return RoomModel.findOne({ roomId: id }).lean();
  },

  async create(r: Partial<IRoom>): Promise<IRoom> {
    const created = await RoomModel.create(r);
    return created.toObject();
  },

  async update(r: IRoom): Promise<IRoom | null> {
    return RoomModel
      .findOneAndUpdate({ roomId: r.roomId }, r, { new: true })
      .lean();
  },

  async remove(id: string): Promise<string> {
    await RoomModel.findOneAndDelete({ roomId: id });
    return id;
  },
};

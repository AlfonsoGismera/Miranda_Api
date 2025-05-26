import { IUser, UserModel } from '../models/User';

export const userService = {
  async fetchAll(): Promise<IUser[]> {
    return UserModel.find().lean<IUser[]>();
  },

  async fetchOneByUsername(username: string): Promise<IUser | null> {
    return UserModel.findOne({ username }).lean();
  },

  async create(user: Partial<IUser>): Promise<IUser> {
    const created = await UserModel.create(user);
    return created.toObject();
  },

  async remove(username: string): Promise<string> {
    await UserModel.findOneAndDelete({ username });
    return username;
  }
};

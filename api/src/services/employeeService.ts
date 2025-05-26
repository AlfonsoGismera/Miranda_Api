import { IEmployee, EmployeeModel } from '../models/Employee';

/**
 * Devuelve todos los empleados
 */
export const employeeService = {
  async fetchAll(): Promise<IEmployee[]> {
    return EmployeeModel.find().lean<IEmployee[]>();
  },

  async fetchOne(id: string): Promise<IEmployee | null> {
    return EmployeeModel.findOne({ employeeId: id }).lean();
  },

  async create(emp: Partial<IEmployee>): Promise<IEmployee> {
    const created = await EmployeeModel.create(emp);
    return created.toObject();
  },

  async update(emp: IEmployee): Promise<IEmployee | null> {
    return EmployeeModel
      .findOneAndUpdate({ employeeId: emp.employeeId }, emp, { new: true })
      .lean();
  },

  async remove(id: string): Promise<string> {
    await EmployeeModel.findOneAndDelete({ employeeId: id });
    return id;
  },
};

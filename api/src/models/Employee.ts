import { Schema, model, Document } from 'mongoose';
import { Employee } from '../interfaces/models';

export interface IEmployee extends Employee, Document {}

const EmployeeSchema = new Schema<IEmployee>({
  employeeId:{ type: String, required: true, unique: true },
  name:      { type: String, required: true },
  image:     { type: String },
  jobDesk:   { type: String, required: true },
  schedule: [{ type: String }],
  hireDate:  { type: String, required: true },
  contact:   { type: String, required: true },
  status:    { type: String, enum: ['Active','Inactive'], default: 'Active' }
});

export const EmployeeModel = model<IEmployee>('Employee', EmployeeSchema);

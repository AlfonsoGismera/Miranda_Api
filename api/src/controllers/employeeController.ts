import { RequestHandler } from 'express';
import { employeeService } from '../services/services';
import { Employee } from '../interfaces/models';

export const getEmployees: RequestHandler = async (req, res) => {
  const list = await employeeService.fetchAll();
  res.json(list);
};

export const getEmployee: RequestHandler = async (req, res): Promise<void> => {
  const emp = await employeeService.fetchOne(req.params.id);
  if (!emp) {
    res.sendStatus(404);
    return;
  }
  res.json(emp);
};

export const createEmployee: RequestHandler = async (req, res) => {
  const data = req.body as Employee;
  const created = await employeeService.create(data);
  res.status(201).json(created);
};

export const updateEmployeeCtrl: RequestHandler = async (req, res) => {
  const data = req.body as Employee;
  const updated = await employeeService.update(data);
  res.json(updated);
};

export const deleteEmployeeCtrl: RequestHandler = async (req, res) => {
  const id = await employeeService.remove(req.params.id);
  res.json({ id });
};

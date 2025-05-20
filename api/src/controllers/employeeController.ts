import { Request, Response } from 'express';
import { employeeService } from '../services/services';
import { Employee } from '../interfaces/models';

export async function getEmployees(req: Request, res: Response) {
  const list = await employeeService.fetchAll();
  res.json(list);
}

export async function getEmployee(req: Request, res: Response) {
  const emp = await employeeService.fetchOne(req.params.id);
  if (!emp) return res.sendStatus(404);
  res.json(emp);
}

export async function createEmployee(req: Request, res: Response) {
  const data: Employee = req.body;
  const created = await employeeService.create(data);
  res.status(201).json(created);
}

export async function updateEmployeeCtrl(req: Request, res: Response) {
  const data: Employee = req.body;
  const updated = await employeeService.update(data);
  res.json(updated);
}

export async function deleteEmployeeCtrl(req: Request, res: Response) {
  const id = await employeeService.remove(req.params.id);
  res.json({ id });
}
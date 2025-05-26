// src/controllers/employeeController.ts
import { RequestHandler } from 'express';
import { employeeService } from '../services/employeeService';
import { IEmployee } from '../models/Employee';

/**
 * @openapi
 * /employees:
 *   get:
 *     summary: Obtener todos los empleados
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de empleados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Employee'
 */
export const getEmployees: RequestHandler = async (_req, res) => {
  const list = await employeeService.fetchAll();
  res.json(list);
};

/**
 * @openapi
 * /employees/{id}:
 *   get:
 *     summary: Obtener un empleado por ID
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado
 *     responses:
 *       '200':
 *         description: Detalles del empleado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       '404':
 *         description: Empleado no encontrado
 */
export const getEmployee: RequestHandler<{ id: string }> = async (req, res) => {
  const emp = await employeeService.fetchOne(req.params.id);
  if (!emp) {
    res.sendStatus(404);
    return;
  }
  res.json(emp);
};

/**
 * @openapi
 * /employees:
 *   post:
 *     summary: Crear un nuevo empleado
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       '201':
 *         description: Empleado creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
export const createEmployee: RequestHandler<{}, IEmployee> = async (req, res) => {
  const data = req.body as Partial<IEmployee>;
  const created = await employeeService.create(data);
  res.status(201).json(created);
};

/**
 * @openapi
 * /employees/{id}:
 *   put:
 *     summary: Actualizar un empleado existente
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       '200':
 *         description: Empleado actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 */
export const updateEmployeeCtrl: RequestHandler<{ id: string }, IEmployee> = async (req, res) => {
  const data = req.body as IEmployee;
  // opcional: asegurarse de que data.employeeId coincida con req.params.id
  data.employeeId = req.params.id;
  const updated = await employeeService.update(data);
  if (!updated) {
    res.sendStatus(404);
    return;
  }
  res.json(updated);
};

/**
 * @openapi
 * /employees/{id}:
 *   delete:
 *     summary: Eliminar un empleado
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado a eliminar
 *     responses:
 *       '200':
 *         description: ID del empleado eliminado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID eliminado
 */
export const deleteEmployeeCtrl: RequestHandler<{ id: string }> = async (req, res) => {
  const id = await employeeService.remove(req.params.id);
  res.json({ id });
};

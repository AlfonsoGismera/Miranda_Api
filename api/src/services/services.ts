import { promises as fs } from 'fs';
import path from 'path';
import { Employee, Guest, Room } from '../interfaces/models';

// Helper to read JSON file
async function readJson<T>(fileName: string): Promise<T[]> {
  const filePath = path.join(__dirname, '../data', fileName);
  const data = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(data) as T[];
}


// Helper to write JSON file
async function writeJson<T>(fileName: string, data: T[]): Promise<void> {
  const filePath = path.join(__dirname, '../data', fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

/** Employee Service */
export const employeeService = {
  async fetchAll(): Promise<Employee[]> {
    return await readJson<Employee>('employees.json');
  },
  async fetchOne(id: string): Promise<Employee | undefined> {
    const all = await this.fetchAll();
    return all.find(e => e.employeeId === id);
  },
  async create(emp: Employee): Promise<Employee> {
    const all = await this.fetchAll();
    all.push(emp);
    await writeJson('employees.json', all);
    return emp;
  },
  async update(emp: Employee): Promise<Employee> {
    const all = await this.fetchAll();
    const updated = all.map(e => (e.employeeId === emp.employeeId ? emp : e));
    await writeJson('employees.json', updated);
    return emp;
  },
  async remove(id: string): Promise<string> {
    let all = await this.fetchAll();
    all = all.filter(e => e.employeeId !== id);
    await writeJson('employees.json', all);
    return id;
  },
};

/** Guest Service */
export const guestService = {
  async fetchAll(): Promise<Guest[]> {
    return await readJson<Guest>('guests.json');
  },
  async fetchOne(id: string): Promise<Guest | undefined> {
    const all = await this.fetchAll();
    return all.find(g => g.reservationId === id);
  },
  async create(g: Guest): Promise<Guest> {
    const all = await this.fetchAll();
    all.push(g);
    await writeJson('guests.json', all);
    return g;
  },
  async update(g: Guest): Promise<Guest> {
    const all = await this.fetchAll();
    const updated = all.map(x => (x.reservationId === g.reservationId ? g : x));
    await writeJson('guests.json', updated);
    return g;
  },
  async remove(id: string): Promise<string> {
    let all = await this.fetchAll();
    all = all.filter(g => g.reservationId !== id);
    await writeJson('guests.json', all);
    return id;
  },
};

/** Room Service */
export const roomService = {
  async fetchAll(): Promise<Room[]> {
    return await readJson<Room>('roomList.json');
  },
  async fetchOne(id: string): Promise<Room | undefined> {
    const all = await this.fetchAll();
    return all.find(r => r.roomId === id);
  },
  async create(r: Room): Promise<Room> {
    const all = await this.fetchAll();
    all.push(r);
    await writeJson('roomList.json', all);
    return r;
  },
  async update(r: Room): Promise<Room> {
    const all = await this.fetchAll();
    const updated = all.map(x => (x.roomId === r.roomId ? r : x));
    await writeJson('roomList.json', updated);
    return r;
  },
  async remove(id: string): Promise<string> {
    let all = await this.fetchAll();
    all = all.filter(r => r.roomId !== id);
    await writeJson('roomList.json', all);
    return id;
  },
};

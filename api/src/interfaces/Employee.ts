export interface Employee {
  employeeId: string;
  name: string;
  image: string;
  jobDesk: string;
  schedule: string[];  
  hireDate: string;
  contact: string;
  status: 'Active' | 'Inactive';
}
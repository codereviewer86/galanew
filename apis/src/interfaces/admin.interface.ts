export interface Admin {
  id: number;
  email: string;
  password?: string;
  name: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

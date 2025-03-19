import { User } from "./User";

export interface Car {
  id: string;
  name: string;
  brand: string;
  color: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

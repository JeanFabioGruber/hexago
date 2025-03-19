import { Car } from "./Car";

export interface User {
  id: string;
    fullName: string;
    email: string;
    password: string;
    cars: Car[];
    createdAt: Date;
    updatedAt: Date;  
}
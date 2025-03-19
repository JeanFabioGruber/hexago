import { Car } from "../domain/Car";

export interface CarsRepositoryPort {
  findAll(): Promise<Car[]>;
  findByOne(param: string): Promise<Car | null>;
  saveCar(user: Car, id: string): Promise<Car>;
  deleteCar(id: string): Promise<boolean>;
  updateCar(id: string, user: Car): Promise<Car>;
}

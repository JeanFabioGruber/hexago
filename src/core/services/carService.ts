import { Car } from "../domain/Car";
import { User } from "../domain/User";
import { CarsRepositoryPort } from "../ports/CarsRepositoryPort";
import { UserRepositoryPort } from "../ports/UserRepositoryPort";

export class CarService {
  constructor(
    private readonly carsRepository: CarsRepositoryPort,
    private readonly userRepository: UserRepositoryPort
  ) {}
  async getCars(): Promise<Car[]> {
    return await this.carsRepository.findAll();
  }
  async createCar(car: Car, userId: string): Promise<Car> {
    const user = await this.userRepository.findId(userId);
    car.user = user as User;
    return await this.carsRepository.saveCar(car, userId);
  }
  async updateCar(id: string, car: Car): Promise<Car> {
    return await this.carsRepository.updateCar(id, car);
  }
  async deleteCar(id: string): Promise<boolean> {
    return await this.carsRepository.deleteCar(id);
  }
  async getCar(param: string): Promise<Car | null> {
    return await this.carsRepository.findByOne(param);
  }
}

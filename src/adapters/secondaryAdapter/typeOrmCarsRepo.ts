import { CarsRepositoryPort } from "../../core/ports/CarsRepositoryPort";
import { Car } from "../../core/domain/Car";
import { User } from "../../core/domain/User";
import { CarsORM } from "../../core/entity/CarsORM";
import { UserORM } from "../../core/entity/UserORM";
import { AppDataSource } from "../dataSource/data-source";

export class typeOrmCarsRepo implements CarsRepositoryPort {
  private carsRepository = AppDataSource.getRepository(CarsORM);
  private usersRepository = AppDataSource.getRepository(UserORM);
  async findAll(): Promise<Car[]> {
    const cars = await this.carsRepository.find({ relations: ["user"] });
    return cars;
  }
  async findByOne(param: string): Promise<Car | null> {
    const car = await this.carsRepository.findOne({
      where: { id: param },
      relations: ["user"],
    });
    return car;
  }
  async saveCar(user: Car, id: string): Promise<Car> {
    const owner = await this.usersRepository.findOne({ where: { id } });
    if (!owner) {
      throw new Error("User not found");
    }
    const car = new CarsORM();
    car.name = user?.name;
    car.brand = user?.brand;
    car.color = user?.color;
    car.user = owner;
    return this.carsRepository.save(car);
  }
  async deleteCar(id: string): Promise<boolean> {
    const carToDelete = await this.carsRepository.findOne({ where: { id } });
    if (!carToDelete) {
      throw new Error("Car not found");
    }

    await this.carsRepository.remove(carToDelete);
    return true;
  }
  async updateCar(id: string, user: Car): Promise<Car> {
    const carToUpdate = await this.carsRepository.findOne({ where: { id } });
    if (!carToUpdate) {
      throw new Error("Car not found");
    }
    carToUpdate.name = user?.name;
    carToUpdate.brand = user?.brand;
    carToUpdate.color = user?.color;
    return this.carsRepository.save(carToUpdate);
  }
}

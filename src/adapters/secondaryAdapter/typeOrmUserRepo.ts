import { UserORM } from "../../core/entity/UserORM";
import { User } from "../../core/domain/User";
import { UserRepositoryPort } from "../../core/ports/UserRepositoryPort";
import { AppDataSource } from "../dataSource/data-source";

export class TypeOrmUserRepository implements UserRepositoryPort {
  private userRepository = AppDataSource.getRepository(UserORM);

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ["cars"] });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findId(id: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id }, relations: ["cars"] }); 
  }

  async updateUser(id: string, userData: User): Promise<User> {
    const userToUpdate = await this.userRepository.findOne({ where: { id } });

    if (!userToUpdate) {
      throw new Error("User not found");
    }

    userToUpdate.email = userData.email;
    userToUpdate.fullName = userData.fullName;

    return await this.userRepository.save(userToUpdate);
  }

  async deleteUser(id: string): Promise<boolean> {
    const userToDelete = await this.userRepository.findOne({ where: { id } });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    await this.userRepository.remove(userToDelete);
    return true;
  }

  async createUser(userData: User): Promise<User> {
    const newUser = new UserORM(); 
    newUser.email = userData.email;
    newUser.fullName = userData.fullName;
    
    return await this.userRepository.save(newUser);
  }
}

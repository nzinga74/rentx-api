import { Repository, getRepository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { User } from "../models/User";

class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = getRepository(User);
  }
  async save(user: User): Promise<User> {
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }
  async findById(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ id });
    return user;
  }
  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ email });
    return user;
  }
  async create({
    email,
    name,
    password,
    drive_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.userRepository.create({
      email,
      name,
      password,
      drive_license,
      adm: false,
    });
    await this.userRepository.save(user);
  }
}

export { UserRepository };

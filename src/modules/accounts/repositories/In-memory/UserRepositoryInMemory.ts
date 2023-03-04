import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/models/User";
import { IUserRepository } from "../IUserRepository";
import { v4 as uuid } from "uuid";

class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];
  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id == id);
  }
  async create({
    password,
    drive_license,
    email,
    name,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, {
      id: uuid(),
      password,
      drive_license,
      email,
      name,
    });
    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email == email);
  }
  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }
}

export { UserRepositoryInMemory };

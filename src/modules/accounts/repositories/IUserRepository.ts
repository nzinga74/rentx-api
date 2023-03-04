import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/models/User";

interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  create(userData: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}

export { IUserRepository };

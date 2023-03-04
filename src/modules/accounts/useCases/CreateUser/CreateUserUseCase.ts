import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    password,
    drive_license,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExist = this.userRepository.findByEmail(email);
    if (!userAlreadyExist) {
      throw new AppError("Email already exists");
    }
    const password_hash = await hash(password, 8);
    await this.userRepository.create({
      name,
      email,
      password: password_hash,
      drive_license,
    });
  }
}

export { CreateUserUseCase };

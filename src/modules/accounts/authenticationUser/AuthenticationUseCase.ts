import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../repositories/IUserRepository";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { response } from "express";
import { AppError } from "../../../errors/AppError";

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
@injectable()
class AuthenticationUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email/Password is incorrect");
    }
    const verifyPassword = await compare(password, user.password);
    if (!verifyPassword) {
      throw new AppError("Email/Password is incorrect");
    }
    const token = sign({}, "4dc3b6faee9b1081c985224820bd3248f4934b3c", {
      subject: user.id,
      expiresIn: "1d",
    });

    const authenticationResponse: IResponse = {
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    };
    return authenticationResponse;
  }
}

export { AuthenticationUseCase };

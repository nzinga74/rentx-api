import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticationUseCase } from "./AuthenticationUseCase";
class AuthenticationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticationUseCase = container.resolve(AuthenticationUseCase);
    const authenticationResponse = await authenticationUseCase.execute({
      email,
      password,
    });

    return response.status(201).json(authenticationResponse);
  }
}
export { AuthenticationController };

import { Request, Response, NextFunction } from "express";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";

const ensureAdmin = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userRepository = new UserRepository();
  const { id: user_id } = request.user;
  const user = await userRepository.findById(user_id);
  if (!user?.adm) {
    throw new Error("User is not permission");
  }
  next();
};

export { ensureAdmin };

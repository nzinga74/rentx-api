import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { container } from "tsyringe";

class CreateCategoryController {
  handler(request: Request, response: Response) {
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
    const { name, description } = request.body;
    createCategoryUseCase.execute({ name, description });
    response.status(201).send();
  }
}

export { CreateCategoryController };

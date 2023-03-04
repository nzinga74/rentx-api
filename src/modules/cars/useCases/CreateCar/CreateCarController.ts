import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
  async handle(request: Request, response: Response) {
    const {
      name,
      brand,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      category_id,
    } = request.body;
    const createCarUseCase = container.resolve(CreateCarUseCase);
    const car = await createCarUseCase.execute({
      name,
      brand,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      category_id,
    });

    return response.status(201).json(car);
  }
}
export { CreateCarController };

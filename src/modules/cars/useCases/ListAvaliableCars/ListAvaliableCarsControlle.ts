import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvaliableUseCase } from "./ListAvaliableCarsUseCase";

class ListAvaliableCarsController {
  async handle(request: Request, response: Response) {
    const { name, brand, category_id } = request.query;
    const listAvaliableUseCase = container.resolve(ListAvaliableUseCase);
    const cars = await listAvaliableUseCase.execute({
      name: name as string,
      category_id: category_id as string,
      brand: brand as string,
    });

    return response.status(201).json(cars);
  }
}

export { ListAvaliableCarsController };

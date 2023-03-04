import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { container } from "tsyringe";

class ListCategoryController {
  async handler(request: Request, response: Response): Promise<Response> {
    const listCategoryUseCase = container.resolve(ListCategoriesUseCase);
    const allCategories = await listCategoryUseCase.execute();
    return response.json(allCategories);
  }
}
export { ListCategoryController };

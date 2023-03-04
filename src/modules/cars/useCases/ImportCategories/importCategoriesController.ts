import { Request, Response } from "express";
import { ImportCategoriesUseCase } from "./importCategoriesUseCase";
import { container } from "tsyringe";

class ImportCategoriesController {
  async handler(request: Request, response: Response) {
    if (request.file) {
      const importCategoriesUseCase = container.resolve(
        ImportCategoriesUseCase
      );
      await importCategoriesUseCase.execute(request.file);
    }
    return response.send();
  }
}

export { ImportCategoriesController };

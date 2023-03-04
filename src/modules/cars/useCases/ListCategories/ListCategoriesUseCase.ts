import { inject, injectable } from "tsyringe";
import { Category } from "@modules/cars/infra/typeorm/models/Category ";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}
  async execute(): Promise<Category[]> {
    return await this.categoryRepository.list();
  }
}
export { ListCategoriesUseCase };

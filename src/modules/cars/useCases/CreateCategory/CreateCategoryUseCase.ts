import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRespository: ICategoryRepository
  ) {}
  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExist = await this.categoryRespository.findByname(
      name
    );
    if (categoryAlreadyExist) {
      throw new Error("Category already exists");
    }

    this.categoryRespository.create({
      name,
      description,
    });
  }
}

export { CreateCategoryUseCase };

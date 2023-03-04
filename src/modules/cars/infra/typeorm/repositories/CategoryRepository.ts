import { v4 as uuid } from "uuid";
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoryRepository";
import { Repository, getRepository } from "typeorm";
import { Category } from "../models/Category ";

class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;
  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const newCategory = this.repository.create({
      name,
      description,
    });

    await this.repository.save(newCategory);
  }
  async list(): Promise<Category[]> {
    return await this.repository.find();
  }
  async findByname(categoryName: string): Promise<Category | undefined> {
    return await this.repository.findOne({ name: categoryName });
  }
}

export { CategoryRepository };

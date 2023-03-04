import { Category } from "../../infra/typeorm/models/Category ";

import { v4 as uuid } from "uuid";
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from "../ICategoryRepository";

class CategoryRepositoryInMemory implements ICategoryRepository {
  private categories: Category[] = [];
  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const newCategory = new Category();
    Object.assign(newCategory, {
      name,
      description,
      id: uuid(),
    });
    this.categories.push(newCategory);
  }
  async list(): Promise<Category[]> {
    return this.categories;
  }
  async findByname(categoryName: string): Promise<Category | undefined> {
    return this.categories.find((category) => category.name == categoryName);
  }
}
export { CategoryRepositoryInMemory };

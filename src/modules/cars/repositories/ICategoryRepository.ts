import { Category } from "../infra/typeorm/models/Category ";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoryRepository {
  create({ description, name }: ICreateCategoryDTO): Promise<void>;
  list(): Promise<Category[]>;
  findByname(categoryName: string): Promise<Category | undefined>;
}

export { ICreateCategoryDTO, ICategoryRepository };

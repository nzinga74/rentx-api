import fs from "fs";
import csvParse from "csv-parser";
import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}
  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];
      const stream = fs.createReadStream(file.path);
      const parseFile = csvParse();
      stream.pipe(parseFile);
      parseFile
        .on("data", async (line) => {
          console.log(line);
          categories.push(line);
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file);
    categories.map(async (category) => {
      const { name, description } = category;
      const categoryAlreadyExists = await this.categoryRepository.findByname(
        name
      );
      if (!categoryAlreadyExists) {
        this.categoryRepository.create({ description, name });
      }
    });
  }
}

export { ImportCategoriesUseCase };

import { Multer } from "multer";
import fs from "fs";
import csvParse from "csv-parser";
import { Specification } from "@modules/cars/infra/typeorm/models/ISpecification";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

interface IRequest {
  file: Express.Multer.File;
}
class ImportSpecification {
  constructor(private specificationRepository: ISpecificationRepository) {}

  loadSpecification(file: Express.Multer.File): Promise<Specification[]> {
    return new Promise((resolve, reject) => {
      const specifications: Specification[] = [];
      const fileParse = csvParse();
      const stream = fs.createReadStream(file.path);
      stream.pipe(fileParse);
      fileParse
        .on("data", async (data) => {
          specifications.push(data);
        })
        .on("end", () => {
          resolve(specifications);
        })
        .on("error", (error) => {
          reject(error);
        });
    });
  }
  async execute({ file }: IRequest) {
    const specifications = await this.loadSpecification(file);
    specifications.map((specification) => {
      this.specificationRepository.create(specification);
    });
    console.log(specifications);
  }
}

export { ImportSpecification };

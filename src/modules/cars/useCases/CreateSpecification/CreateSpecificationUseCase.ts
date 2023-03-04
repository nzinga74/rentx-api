import { inject, injectable } from "tsyringe";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

interface ISpecificationRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}
  async execute({ name, description }: ISpecificationRequest) {
    const specificationAlreadyExists =
      await this.specificationRepository.findByName(name);
    if (specificationAlreadyExists) {
      throw new Error("Specification already exists");
    }
    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };

import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

class ListSpecification {
  constructor(private specificationRepository: ISpecificationRepository) {}
  execute() {
    const allSpecification = this.specificationRepository.list();
    return allSpecification;
  }
}

export { ListSpecification };

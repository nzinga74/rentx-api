import { Specification } from "../infra/typeorm/models/ISpecification";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): void;
  findByName(specificationName: string): Promise<Specification | undefined>;
  list(): Promise<Specification[]>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };

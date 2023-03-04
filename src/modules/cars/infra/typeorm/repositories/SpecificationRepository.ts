import { v4 as uuid } from "uuid";

import { Repository, getRepository } from "typeorm";
import { injectable } from "tsyringe";
import { Specification } from "../models/ISpecification";
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "@modules/cars/repositories/ISpecificationRepository";

class SpecificationRepository implements ISpecificationRepository {
  private specificationsRepository: Repository<Specification>;
  constructor() {
    this.specificationsRepository = getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = {
      name,
      description,
      created_at: new Date(),
    };
    const newSpecification =
      this.specificationsRepository.create(specification);
    await this.specificationsRepository.save(newSpecification);
  }
  async findByName(
    specificationName: string
  ): Promise<Specification | undefined> {
    return await this.specificationsRepository.findOne({
      name: specificationName,
    });
  }
  async list(): Promise<Specification[]> {
    const allSpecifaction = await this.specificationsRepository.find();
    return allSpecifaction;
  }
}

export { SpecificationRepository };

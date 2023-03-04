import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { Car } from "../models/Car";
import { Repository, getRepository } from "typeorm";

class CarRepository implements ICarRepository {
  private carRepository: Repository<Car>;

  constructor() {
    this.carRepository = getRepository(Car);
  }
  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.carRepository.create({
      brand,
      category_id,
      description,
      fine_amount,
      daily_rate,
      license_plate,
      name,
    });
    return await this.carRepository.save(car);
  }
  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    return await this.carRepository.findOne({ where: { license_plate } });
  }
}

export { CarRepository };

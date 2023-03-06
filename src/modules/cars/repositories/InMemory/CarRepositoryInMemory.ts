import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/models/Car";
import { ICarRepository } from "../ICarRepository";

class CarRepositoryInMemory implements ICarRepository {
  private cars: Car[];
  constructor() {
    this.cars = [];
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
    const car = new Car();
    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });
    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car | undefined> {
    const car = this.cars.find((car) => car.license_plate == license_plate);
    return car;
  }
  async findAvaliableCars(
    category_id?: string | undefined,
    brand?: string | undefined,
    name?: string | undefined
  ): Promise<Car[]> {
    let allCar = this.cars.filter((car) => car.available == true);

    return allCar;
  }
}

export { CarRepositoryInMemory };

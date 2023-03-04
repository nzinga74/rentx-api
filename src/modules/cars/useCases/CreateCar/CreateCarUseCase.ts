import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}
  async execute({
    name,
    brand,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    category_id,
  }: ICreateCarDTO) {
    const carAlreadyExist = await this.carRepository.findByLicensePlate(
      license_plate
    );
    if (carAlreadyExist) {
      throw new Error("Car already Exists");
    }
    const car = await this.carRepository.create({
      name,
      brand,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      category_id,
    });
    return car;
  }
}

export { CreateCarUseCase };

import { injectable, inject } from "tsyringe";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}
@injectable()
class ListAvaliableUseCase {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}
  async execute({ brand, category_id, name }: IRequest) {
    const cars = await this.carRepository.findAvaliableCars(
      category_id,
      brand,
      name
    );
    return cars;
  }
}

export { ListAvaliableUseCase };

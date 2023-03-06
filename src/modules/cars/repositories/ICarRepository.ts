import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/models/Car";

interface ICarRepository {
  create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car>;

  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findAvaliableCars(
    category_id?: string,
    brand?: string,
    name?: string
  ): Promise<Car[]>;
}

export { ICarRepository };

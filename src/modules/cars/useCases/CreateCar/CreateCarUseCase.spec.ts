import { v4 as uuid } from "uuid";
import { CreateCarUseCase } from "./CreateCarUseCase";
import { CarRepositoryInMemory } from "@modules/cars/repositories/InMemory/CarRepositoryInMemory";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";

let createCarUseCase: CreateCarUseCase;
let carRepository: ICarRepository;
describe("Create Cars", () => {
  beforeEach(() => {
    carRepository = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carRepository);
  });
  it("should be able to create a car", async () => {
    const car = await createCarUseCase.execute({
      name: "car test",
      brand: "new brand",
      daily_rate: 1,
      description: "new description",
      fine_amount: 2,
      license_plate: "new license plate",
      category_id: uuid(),
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with same license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "car test",
        brand: "new brand",
        daily_rate: 1,
        description: "new description",
        fine_amount: 2,
        license_plate: "new license plate",
        category_id: uuid(),
      });

      await createCarUseCase.execute({
        name: "car test",
        brand: "new brand",
        daily_rate: 1,
        description: "new description",
        fine_amount: 2,
        license_plate: "new license plate",
        category_id: uuid(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});

import { CarRepositoryInMemory } from "@modules/cars/repositories/InMemory/CarRepositoryInMemory";
import { ListAvaliableUseCase } from "./ListAvaliableCarsUseCase";

let listAvaliableCarsUseCase: ListAvaliableUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;
describe("List Avaliable Cars", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    listAvaliableCarsUseCase = new ListAvaliableUseCase(carRepositoryInMemory);
  });
  it("should be able to list avaliable cars", async () => {
    const car = await carRepositoryInMemory.create({
      name: "BMWX21",
      brand: "new brand",
      daily_rate: 4,
      description: "brand new car",
      fine_amount: 500,
      license_plate: "AXR21",
      category_id: "c074ca9c-e11d-4c63-bedf-80a1fb8571f5",
    });
    const cars = await listAvaliableCarsUseCase.execute();
    expect(cars).toEqual([car]);
  });
  it("should be able to list avaliable cars by name", async () => {
    await carRepositoryInMemory.create({
      name: "BMWX21",
      brand: "new brand",
      daily_rate: 4,
      description: "brand new car",
      fine_amount: 500,
      license_plate: "AXR21",
      category_id: "c074ca9c-e11d-4c63-bedf-80a1fb8571f5",
    });
    const car = await carRepositoryInMemory.create({
      name: "BMWX22",
      brand: "brand",
      daily_rate: 5,
      description: "new car",
      fine_amount: 600,
      license_plate: "AXR2",
      category_id: "c074ca9c-e11d-4c63-bedf",
    });

    const cars = await listAvaliableCarsUseCase.execute(
      "c074ca9c-e11d-4c63-bedf"
    );
    console.log("@", cars);
    expect(cars).toContain(car);
  });
});

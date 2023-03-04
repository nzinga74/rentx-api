import { CategoryRepositoryInMemory } from "../../repositories/InMemory/CategoryRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let categoryRepositoryInMemory: CategoryRepositoryInMemory;
let createCategoryUseCase: CreateCategoryUseCase;

describe("Create Category", () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoryRepositoryInMemory
    );
  });
  it("should create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "category desccription",
    };
    await createCategoryUseCase.execute(category);

    const categoryCreate = await categoryRepositoryInMemory.findByname(
      category.name
    );
    expect(categoryCreate).toHaveProperty("id");
  });
  it("shoud not be able to a new create category with name already existed", () => {
    expect(async () => {
      const category = {
        name: "Category Test",
        description: "category desccription",
      };
      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(Error);
  });
});

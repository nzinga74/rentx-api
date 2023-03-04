import { UserRepositoryInMemory } from "../repositories/In-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../useCases/CreateUser/CreateUserUseCase";
import { AuthenticationUseCase } from "./AuthenticationUseCase";

let userRepositoryInMemory: UserRepositoryInMemory;
let authenticationUseCase: AuthenticationUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticationUseCase = new AuthenticationUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should be able to authenticate a user", async () => {
    const user = {
      name: "example",
      email: "example@gmail.com",
      password: "12345",
      drive_license: "likethis123",
    };
    await createUserUseCase.execute(user);
    const authentication = await authenticationUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(authentication).toHaveProperty("token");
  });

  it("should not be able to authenticate noexistent user", async () => {
    expect(async () => {
      const authentication = await authenticationUseCase.execute({
        email: "example2@gmail.com",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(Error);
  });
  it("should not be able to authenticate an user with wrong password", async () => {
    expect(async () => {
      const user = {
        name: "example",
        email: "example@gmail.com",
        password: "12345",
        drive_license: "likethis123",
      };
      await createUserUseCase.execute(user);
      const authentication = await authenticationUseCase.execute({
        email: user.email,
        password: "@1234",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});

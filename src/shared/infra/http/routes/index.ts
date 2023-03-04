import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { specificationRouter } from "./specification.routes";
import { authenticationRoutes } from "./authentication.routes";
import { userRoutes } from "./users.routes";
import { carsRoutes } from "./cars.routes";

const routes = Router();

routes.use("/categories", categoriesRoutes);
routes.use("/specifications", specificationRouter);
routes.use("/users", userRoutes);
routes.use("/cars", carsRoutes);

routes.use(authenticationRoutes);

export { routes };

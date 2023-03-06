import { CreateCarController } from "@modules/cars/useCases/CreateCar/CreateCarController";
import { Router } from "express";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListAvaliableCarsController } from "@modules/cars/useCases/ListAvaliableCars/ListAvaliableCarsControlle";

const carsRoutes = Router();
const createCarController = new CreateCarController();
const listAvaliableCarsController = new ListAvaliableCarsController();
carsRoutes.use(ensureAuthentication, ensureAdmin);

carsRoutes.post("/", createCarController.handle);
carsRoutes.get("/avaliable", listAvaliableCarsController.handle);

export { carsRoutes };

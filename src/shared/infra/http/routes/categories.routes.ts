import { Router } from "express";
import multer from "multer";
import { CreateCategoryController } from "@modules/cars/useCases/CreateCategory/CreateCatgoryController";
import { ListCategoryController } from "@modules/cars/useCases/ListCategories/ListCategoryController";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { ImportCategoriesController } from "@modules/cars/useCases/ImportCategories/importCategoriesController";
const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoriesController = new ImportCategoriesController();
const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.use(ensureAuthentication);

categoriesRoutes.post("/", createCategoryController.handler);

categoriesRoutes.get("/", listCategoryController.handler);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoriesController.handler
);

export { categoriesRoutes };

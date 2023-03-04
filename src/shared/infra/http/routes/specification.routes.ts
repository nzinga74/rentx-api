import { Router, request } from "express";
import multer from "multer";

import { CreateSpecificationController } from "@modules/cars/useCases/CreateSpecification/CreateSpecificationController";

const specificationRouter = Router();
const upload = multer({
  dest: "./tmp",
});

const createSpecificationController = new CreateSpecificationController();

specificationRouter.post("/", createSpecificationController.handler);

// specificationRouter.post(
//   "/import",
//   upload.single("file"),
//   (request, response) => {
//     importSpecificationController().handle(request, response);
//   }
// );

export { specificationRouter };

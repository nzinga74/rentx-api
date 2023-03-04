import { Request, Response } from "express";
import { ImportSpecification } from "./ImportSpecification";

class ImportSpecificationController {
  constructor(private importSpecification: ImportSpecification) {}
  handle(request: Request, response: Response) {
    if (request.file) {
      this.importSpecification.execute({ file: request.file });
      return response.status(201).send();
    }
    return response.status(404).send();
  }
}

export { ImportSpecificationController };

import { Request, Response } from "express";
import { ListSpecification } from "./ListSpecification";

class ListSpecificationController {
  constructor(private listSpecification: ListSpecification) {}
  handle(request: Request, response: Response) {
    const listSpecification = this.listSpecification.execute();
    return response.json({ specification: listSpecification });
  }
}

export { ListSpecificationController };

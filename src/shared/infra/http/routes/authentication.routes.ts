import { AuthenticationController } from "@modules/accounts/authenticationUser/AuthenticationController";
import { Router } from "express";

const authenticationRoutes = Router();

const authenticationController = new AuthenticationController();
authenticationRoutes.post("/session", authenticationController.handle);

export { authenticationRoutes };

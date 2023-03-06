import { Router } from "express";

import uploadConfig from "@config/upload";
import multer from "multer";
import { CreateUserController } from "@modules/accounts/useCases/CreateUser/CreateUserController";
import { UpdateAvatarController } from "@modules/accounts/useCases/UpdateAvatar/UpdateAvatarController";
import { ensureAuthentication } from "../middlewares/ensureAuthentication";

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));
const userRoutes = Router();
const createUserController = new CreateUserController();
const updateAvatarController = new UpdateAvatarController();

userRoutes.post("/", createUserController.handle);
userRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  updateAvatarController.handle
);

export { userRoutes };

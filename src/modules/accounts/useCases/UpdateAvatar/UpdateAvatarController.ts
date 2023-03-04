import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateAvatarUseCase } from "./UpdateAvatarUseCase";

class UpdateAvatarController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;
    if (request.file) {
      const avatar_file = request.file.filename;
      const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase);
      await updateAvatarUseCase.execute({ avatar_file, user_id });
      return response.status(200).send();
    }
    return response.json({ message: "error while uploading avatar" });
  }
}
export { UpdateAvatarController };

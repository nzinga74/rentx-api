import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  user_id: string;
  avatar_file: string;
}
@injectable()
class UpdateAvatarUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}
  async execute({ avatar_file, user_id }: IRequest) {
    const user = await this.userRepository.findById(user_id);
    if (user) {
      user.avatar = avatar_file;
      await this.userRepository.save(user);
    }
  }
}
export { UpdateAvatarUseCase };

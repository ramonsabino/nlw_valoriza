import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { UsersRepositores } from "../repositories/UsersRepositores";

class ListUserService {
  async execute() {
    const userRepository = getCustomRepository(UsersRepositores);

    const users = await userRepository.find();

    return classToPlain(users);
  }
}

export { ListUserService };

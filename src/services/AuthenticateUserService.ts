import { getCustomRepository } from "typeorm";
import { UsersRepositores } from "../repositories/UsersRepositores";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepositores);

    const user = await usersRepository.findOne({
      email,
    });

    if (!user) {
      throw new Error("EMAIL/PASSWORD INCORRECT");
    }
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("EMAIL/PASSWORD INCORRECT");
    }
    const token = sign(
      {
        email: user.email,
      },
      "fbe2e10356048a74ee635c3848eb62b6",
      {
        subject: user.id,
        expiresIn: "2d",
      }
    );
    return token;
  }
}

export { AuthenticateUserService };

import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositores } from "../repositories/UsersRepositores";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request;
  console.log(user_id);

  const usersRepository = getCustomRepository(UsersRepositores);

  const { admin } = await usersRepository.findOne(user_id);

  if (admin) {
    return next();
  }

  return response.status(401).json({ Error: "User not unauthorized" });
}

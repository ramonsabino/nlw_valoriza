import { getCustomRepository } from "typeorm";
import { ComplimentsRepositores } from "../repositories/ComplimentsRepositores";
import { UsersRepositores } from "../repositories/UsersRepositores";

interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplimentRequest) {
    const complimentsRepositores = getCustomRepository(ComplimentsRepositores);
    const usersRepositores = getCustomRepository(UsersRepositores);

    if (user_sender === user_receiver) {
      throw new Error("USER RECEIVER INCORRECT");
    }

    const userReceiverExist = await usersRepositores.findOne(user_receiver);

    if (!userReceiverExist) {
      throw new Error("USER RECEIVER NOT EXIST");
    }

    const compliment = complimentsRepositores.create({
      tag_id,
      user_receiver,
      user_sender,
      message,
    });

    await complimentsRepositores.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };

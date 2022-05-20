import { getCustomRepository } from "typeorm";
import { ComplimentsRepositores } from "../repositories/ComplimentsRepositores";

class ListUserReceiveComplimentsService {
  async execute(user_id: string) {
    const complimentsRepositores = getCustomRepository(ComplimentsRepositores);

    const compliments = await complimentsRepositores.find({
      where: {
        user_receiver: user_id,
      },
      relations: ["userSender", "userReceiver", "tag"],
    });

    return compliments;
  }
}

export { ListUserReceiveComplimentsService };

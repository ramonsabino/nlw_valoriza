import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    try {
      const { tag_id, user_receiver, message } = request.body;
      const { user_id } = request;

      const createComplimentService = new CreateComplimentService();

      const compliment = await createComplimentService.execute({
        tag_id,
        user_sender: user_id,
        user_receiver,
        message,
      });

      console.log(compliment);
      return response.json(compliment);
    } catch (error) {
      console.log({ error: error.message });
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateComplimentController };

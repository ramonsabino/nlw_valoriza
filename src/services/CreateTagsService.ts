import { getCustomRepository } from "typeorm";
import { TagsRepositores } from "../repositories/TagsRepositores";

class CreateTagsService {
  async execute(name: string) {
    const tagsRepositores = getCustomRepository(TagsRepositores);

    if (!name) {
      throw new Error("Incorrect name");
    }

    const tagsAlreadyExists = await tagsRepositores.findOne({
      name,
    });

    if (tagsAlreadyExists) {
      throw new Error("Tag already exists");
    }

    const tag = tagsRepositores.create({
      name,
    });

    await tagsRepositores.save(tag);

    return tag;
  }
}

export { CreateTagsService };

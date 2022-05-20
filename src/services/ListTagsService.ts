import { getCustomRepository } from "typeorm";
import { TagsRepositores } from "../repositories/TagsRepositores";
import { classToPlain } from "class-transformer";

class ListTagsService {
  async execute() {
    const tagsRepositores = getCustomRepository(TagsRepositores);

    const tags = await tagsRepositores.find();

    return classToPlain(tags);
  }
}

export { ListTagsService };

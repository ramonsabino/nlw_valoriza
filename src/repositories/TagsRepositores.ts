import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../entities/Tag";

@EntityRepository(Tag)
class TagsRepositores extends Repository<Tag> {}

export { TagsRepositores };

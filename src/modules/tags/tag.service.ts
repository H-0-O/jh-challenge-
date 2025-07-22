import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/utils/base.service';
import { Tag } from './entities/tag.entity';
import { CreateTagDTO } from './dtos/tag.dto';

@Injectable()
export class TagService extends BaseService<Tag> {
  constructor() {
    super(Tag);
  }

  public async create(dto: CreateTagDTO) {
    const tag = new Tag();
    tag.assign({
      name: dto.name,
    });

    await this.entityManager.persistAndFlush(tag);

    return tag;
  }
}

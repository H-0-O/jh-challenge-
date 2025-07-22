import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDTO } from './dtos/tag.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { Tag } from './entities/tag.entity';

@Controller('/tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @ApiOkResponse({
    type: Tag,
  })
  @Post('/')
  public async create(@Body() dto: CreateTagDTO) {
    return await this.tagService.create(dto);
  }

  @Get('/')
  public async index() {
    return (await this.tagService.all()).map(t => t.toObject());
  }
}

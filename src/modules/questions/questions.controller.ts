import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { QuestionService } from './questions.service';
import {
  AssignTagDTO,
  CreateQuestionDTO,
  ShowWithAnswerCountsDTO,
} from './dtos/question.dto';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Question } from './entities/question.entity';
import { CreateAnswerDTO } from '../answers/dtos/answer.dto';

@Controller('/questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ApiOkResponse({
    type: Question,
  })
  @Post('/')
  public async create(@Body() dto: CreateQuestionDTO) {
    return (await this.questionService.create(dto)).toObject();
  }
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'tag',
    required: false,
    type: String,
  })
  @ApiOkResponse()
  @Get('/')
  public async index(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('tag') tag?: string,
  ) {
    const data = await this.questionService.paginateAndFilter(page, limit, tag);

    return {
      total: data[1],
      data: data[0].map((q) => q.toObject()),
    };
  }

  @ApiOkResponse({
    type: ShowWithAnswerCountsDTO,
  })
  @Get('/:id')
  public async show(@Param('id') id: number) {
    return this.questionService.showWithAnswerCounts(id);
  }

  @HttpCode(204)
  @Post('/:id/answer')
  public async answer(@Param('id') id: number, @Body() dto: CreateAnswerDTO) {
    return (await this.questionService.answer(id, dto)).toObject();
  }

  @HttpCode(204)
  @Post('/:id/tags')
  public async assignTag(@Param('id') id: number, @Body() dto: AssignTagDTO) {
    await this.questionService.assignTags(id, dto.tagIDs);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
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
import { AuthGuard } from '../auth/auth.gaurd';
import { Request } from 'express';

@Controller('/questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: Question,
  })
  @Post('/')
  public async create(@Body() dto: CreateQuestionDTO, @Req() req: Request) {
    return (
      await this.questionService.create(dto, req.user.id as number)
    ).toObject();
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

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Post('/:id/answer')
  public async answer(
    @Param('id') id: number,
    @Body() dto: CreateAnswerDTO,
    @Req() req: Request,
  ) {
    console.log("THE REQUEST" , req.user);
    
    return (await this.questionService.answer(id, dto, req.user.id)).toObject();
  }

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Post('/:id/tags')
  public async assignTag(@Param('id') id: number, @Body() dto: AssignTagDTO) {
    await this.questionService.assignTags(id, dto.tagIDs);
  }
}

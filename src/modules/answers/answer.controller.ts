import {
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Value } from './entities/vote.entity';
import { ApiOkResponse } from '@nestjs/swagger';
import { StatisticsResponseDTO } from './dtos/answer.dto';
import { AuthGuard } from '../auth/auth.gaurd';
import { Request } from 'express';

@Controller('/answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Patch('/:id/mark-correct')
  public async correct(@Param('id') id: number, @Req() req: Request) {
    return await this.answerService.markCorrect(id, req.user.id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Post('/:id/vote/:upDown')
  public async vote(
    @Param('id') id: number,
    @Param('upDown') upDown: 'up' | 'down',
    @Req() req: Request,
  ) {
    await this.answerService.vote(
      id,
      upDown == 'up' ? Value.plus : Value.mines,
      req.user.id,
    );
  }

  @ApiOkResponse({
    type: StatisticsResponseDTO,
  })
  @Get('/:id/statistics')
  public async statistics(@Param('id') id: number) {
    return await this.answerService.answerStatistics(id);
  }
}

import { Controller, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Value } from './entities/vote.entity';
import { ApiOkResponse } from '@nestjs/swagger';
import { StatisticsResponseDTO } from './dtos/answer.dto';
import { AuthGuard } from '../auth/auth.gaurd';

@Controller('/answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}
  @HttpCode(204)
  @Patch('/:id/mark-correct')
  public async correct(@Param('id') id: number) {
    return await this.answerService.markCorrect(id);
  }

  @UseGuards(AuthGuard)
  @HttpCode(204)
  @Post('/:id/vote/:upDown')
  public async vote(
    @Param('id') id: number,
    @Param('upDown') upDown: 'up' | 'down',
  ) {
    await this.answerService.vote(
      id,
      upDown == 'up' ? Value.plus : Value.mines,
    );
  }

  @ApiOkResponse({
    type: StatisticsResponseDTO
  })
  @Get('/:id/statistics')
  public async statistics(@Param('id') id: number) {
    return await this.answerService.answerStatistics(id);
  }
}

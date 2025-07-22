import { ForbiddenException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/utils/base.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDTO, StatisticsResponseDTO } from './dtos/answer.dto';
import { Question } from '../questions/entities/question.entity';
import { User } from '../users/entities/user.entity';
import { Value, Vote } from './entities/vote.entity';

@Injectable()
export class AnswerService extends BaseService<Answer> {
  constructor() {
    super(Answer);
  }

  public async create(questionID: number, dto: CreateAnswerDTO) {
    const answer = new Answer();

    answer.assign({
      content: dto.content,
      user: this.entityManager.getReference(User, 2),
      question: this.entityManager.getReference(Question, questionID),
    });

    await this.entityManager.persistAndFlush(answer);
    return answer;
  }

  public async markCorrect(id: number) {
    const answer = await this.entityManager.findOneOrFail(
      Answer,
      {
        id,
      },
      {
        populate: ['question.user'],
      },
    );

    if (answer.question.user.id != 2) {
      throw new ForbiddenException();
    }

    answer.correct = true;

    await this.entityManager.persistAndFlush(answer);
  }

  public async vote(answerID: number, upDown: Value) {
    const answer = await this.entityManager.findOneOrFail(
      Answer,
      {
        id: answerID,
      },
      {
        populate: ['votes'],
        populateWhere: {
          votes: {
            user: {
              id: 2,
            },
          },
        },
      },
    );

    if (!answer.votes.isEmpty()) return;

    const vote = new Vote();
    vote.assign({
      answer,
      user: this.entityManager.getReference(User, 2),
      value: upDown,
    });
    this.entityManager.persistAndFlush(vote);
  }

  public async answerStatistics(answerID: number) {
    const answer = await this.entityManager.findOneOrFail(Answer, {
      id: answerID,
    });
    const votes = await answer.votes.loadCount();
    return new StatisticsResponseDTO(answerID, answer.content, votes);
  }
}

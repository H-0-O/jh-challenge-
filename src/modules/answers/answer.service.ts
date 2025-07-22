import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/utils/base.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerDTO } from './dtos/answer.dto';
import { Question } from '../questions/entities/question.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AnswerService extends BaseService<Answer> {
  constructor() {
    super(Answer);
  }

  public async create(questionID: number, dto: CreateAnswerDTO) {
    const answer = new Answer();

    answer.assign({
      content: dto.content,
      user: this.entityManager.getReference(User , 2),
      question: this.entityManager.getReference(Question, questionID),
    });

    await this.entityManager.persistAndFlush(answer);
    return answer;
  }
}

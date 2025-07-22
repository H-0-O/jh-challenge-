import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/utils/base.service';
import { Question } from './entities/question.entity';
import {
  CreateQuestionDTO,
  showWithAnswerCountsDTO,
} from './dtos/question.dto';
import { User } from '../users/entities/user.entity';
import { LoadStrategy, raw, wrap } from '@mikro-orm/core';
import { CreateAnswerDTO } from '../answers/dtos/answer.dto';
import { AnswerService } from '../answers/answer.service';
import { Answer } from '../answers/entities/answer.entity';

@Injectable()
export class QuestionService extends BaseService<Question> {
  constructor(private readonly answerService: AnswerService) {
    super(Question);
  }

  public async create(dto: CreateQuestionDTO) {
    const question = new Question();
    question.assign({
      user: this.entityManager.getReference(User, 2),
      title: dto.title,
      description: dto.description,
    });

    await this.entityManager.persistAndFlush(question);
    return question;
  }

  public async showWithAnswerCounts(id: number) {
    const answerSubQuery = this.answerService
      .QB('answer')
      .count('answer.id')
      .where(raw('question_id = q.id')) // 'q' here is the alias for the questions table and we indicate that in next line
      .as('answerCount');

    const query = this.QB<Question, 'q'>('q')
      .select(['*', answerSubQuery])
      .where({
        id: id,
      });

    // the overall query loads just Question and answerCount field

    const questionResult = (await query.execute('get')) as {
      answerCount: number;
    } & Question;

    const answers = await this.answerService
      .QB<Answer, 'a'>('a')
      .where({
        question: id,
      })
      .limit(5)
      .orderBy({ createdAt: 'DESC' })
      .execute('all');

    return new showWithAnswerCountsDTO(questionResult, answers);
    //   ...questionResult,
    //   answers
    // };
  }

  public async answer(questionID: number, createAnswerDTO: CreateAnswerDTO) {
    return await this.answerService.create(questionID, createAnswerDTO);
  }
}

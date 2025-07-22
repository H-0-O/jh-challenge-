import { HttpException, Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/utils/base.service';
import { Question } from './entities/question.entity';
import {
  CreateQuestionDTO,
  ShowWithAnswerCountsDTO,
} from './dtos/question.dto';
import { User } from '../users/entities/user.entity';
import { FilterQuery, LoadStrategy, raw, wrap } from '@mikro-orm/core';
import { CreateAnswerDTO } from '../answers/dtos/answer.dto';
import { AnswerService } from '../answers/answer.service';
import { Answer } from '../answers/entities/answer.entity';
import { Tag } from '../tags/entities/tag.entity';

@Injectable()
export class QuestionService extends BaseService<Question> {
  constructor(
    private readonly answerService: AnswerService,
  ) {
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

    return new ShowWithAnswerCountsDTO(questionResult, answers);
    //   ...questionResult,
    //   answers
    // };
  }

  public async answer(questionID: number, createAnswerDTO: CreateAnswerDTO) {
    return await this.answerService.create(questionID, createAnswerDTO);
  }

  public async assignTags(questionID: number, tagIds: number[]) {
    const question = await this.entityManager.findOne(Question, {
      id: {
        $eq: questionID,
      },
    });

    if (!question) {
      throw new HttpException('question not exists', 404);
    }

    const tags = tagIds.map((tID) => this.entityManager.getReference(Tag, tID));

    question.tags.removeAll();
    question.tags.set(tags);

    await this.entityManager.persistAndFlush(question);
  }

  public async paginateAndFilter(
    page: number = 1,
    limit: number = 10,
    tag?: string,
  ) {
    const offset = (page - 1) * limit;
    const where = {};
    if (tag) {
      where['tags'] = {
        name: tag,
      };
    }

    return await this.entityManager.findAndCount<Question, 'tags'>(Question, where, {
      populate: tag ? ['tags'] : [],
      limit: limit,
      offset,
    });
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { Answer } from 'src/modules/answers/entities/answer.entity';
import { Question } from '../entities/question.entity';
import { User } from 'src/modules/users/entities/user.entity';

export class CreateQuestionDTO {
  @ApiProperty()
  @IsString()
  @MinLength(6)
  @MaxLength(200)
  title: string;

  @ApiProperty()
  @IsString()
  description: string;
}

export class showWithAnswerCountsDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date | null;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  user: number | User;

  @ApiProperty()
  answerCount: number;

  @ApiProperty({
    type: [Answer],
  })
  answers: Answer[];

  constructor(question: Question & { answerCount: number }, answers: Answer[]) {
    this.answerCount = question.answerCount;
    this.answers = answers;

    this.createdAt = question.createdAt;
    this.deletedAt = question.deletedAt;
    this.updatedAt = question.updatedAt;
    this.title = question.title;
    this.description = question.description;
    this.user = question.user;
  }
}

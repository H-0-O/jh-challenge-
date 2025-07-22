import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/utils/base.entity';
import { Question } from 'src/modules/questions/entities/question.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Vote } from './vote.entity';

@Entity({
  tableName: 'answers',
})
export class Answer extends BaseEntity {
  @ApiProperty()
  @Property({
    type: 'text',
  })
  content: string;

  @ApiProperty()
  @Property({
    type: 'bool',
    default: false,
  })
  correct: boolean = false;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Question, { hidden: true })
  question: Question;

  @OneToMany(() => Vote, (vote) => vote.answer)
  votes: Collection<Vote> = new Collection(this);
}

import {
  Entity,
  Enum,
  ManyToOne,
  OneToOne,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from 'src/common/utils/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Answer } from './answer.entity';

export enum Value {
  plus = '+1',
  mines = '-1',
}

@Entity({
  tableName: 'votes',
})
@Unique({
  properties: ['user', 'answer'],
})
export class Vote extends BaseEntity {
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Answer)
  answer: Answer;

  @Enum(() => Value)
  value: Value;
}

import { Collection, Entity, Index, ManyToMany, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/utils/base.entity';
import { Answer } from 'src/modules/answers/entities/answer.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Entity({
  tableName: 'questions',
})
export class Question extends BaseEntity {

  @ApiProperty()
  @Property({
    type: 'varchar',
    length: 200,
  })
  title: string;

  @ApiProperty()
  @Property({
    type: 'text',
  })
  description: string;

  @ManyToOne(() => User , {hidden: true})
  user: User;

  @Index()
  @OneToMany(() => Answer , answer => answer.question)
  answers: Collection<Answer> = new Collection(this)

  @ManyToMany(() => Tag , 'questions' , {owner: true})
  tags: Collection<Tag> = new Collection(this)
}

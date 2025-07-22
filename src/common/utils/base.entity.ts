import {
  Entity,
  PrimaryKey,
  Property,
  BaseEntity as MikroBaseEntity,
} from '@mikro-orm/core';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

@Entity({
  abstract: true,
})
export abstract class BaseEntity extends MikroBaseEntity {

  @ApiResponseProperty()
  @PrimaryKey()
  id: number
  // @PrimaryKey({
  //   type: 'varchar',
  //   length: 26,
  // })
  // ulid: string = ulid();

  @ApiResponseProperty()
  @Property({
    type: 'timestamp',
    onCreate: () => new Date(),
  })
  createdAt: Date;

  @ApiResponseProperty()
  @Property({
    type: 'timestamp',
    onCreate: () => new Date(),
    onUpdate: () => new Date(),
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
    nullable: true,
  })
  @Property({
    type: 'timestamp',
    nullable: true,
  })
  deletedAt: Date | null;

}

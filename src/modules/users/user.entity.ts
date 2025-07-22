import { BeforeCreate, BeforeUpdate, Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { isDirty } from 'src/common/helper';
import { BaseEntity } from 'src/common/utils/base.entity';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { ApiResponseProperty } from '@nestjs/swagger';

@Entity({
  tableName: 'users',
})
export class User extends BaseEntity {

  @ApiResponseProperty()
  @Unique()
  @Property({
    type: 'varchar',
    length: 255,
  })
  email: string;

  @Exclude() 
  @Property({
    type: 'text',
    hidden: true
  })
  password: string;


  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword() {
    this.isTouched()
    if (this.password && isDirty(this, 'password')) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }
}

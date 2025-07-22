import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/user.dto';
import { BaseService } from 'src/common/utils/base.service';
import { User } from './user.entity';

@Injectable()
export class UserService extends BaseService<User> {
  constructor() {
    super(User);
  }
  public async create(dto: CreateUserDto) {
    const founded = await this.entityManager.findOne(User, {
      email: {
        $eq: dto.email,
      },
    });

    if (founded) throw new HttpException('Email already exists', 422);

    const user = new User();

    this.entityManager.assign(user, {
      email: dto.email,
      password: dto.password,
    });

    this.entityManager.persistAndFlush(user);

    return user;
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    type: User,
  })
  @Post('/')
  public async store(@Body() dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    return user.toObject()
  }

  @ApiOkResponse({
    type: [User],
  })
  @Get('/')
  public async index() {
    const data = await this.userService.all();
    return data
  }
}

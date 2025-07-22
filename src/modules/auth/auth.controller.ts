import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import {  ApiOkResponse } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { Request } from 'express';
import { AuthResource } from './auth.resource';
import { LoginUserDto } from './auth.dto';
import { AuthGuard } from './auth.gaurd';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}
 

  @ApiOkResponse({
    type: AuthResource,
  })
  @Post('login')
  public async login(@Body() dto: LoginUserDto): Promise<AuthResource> {
    const data = await this.authService.login(dto);
    return {
      ...data,
      user: data.user.toObject() as User,
    }
  }

  @ApiOkResponse({
    type: User,
  })
  @Get('me')
  @UseGuards(AuthGuard)
  async me(@Req() req: Request): Promise<User> {
    return req.user as User;
  }
}

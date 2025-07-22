import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { AuthResource } from './auth.resource';
import { LoginUserDto } from './auth.dto';
import { UserJWTPayload } from 'src/common/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
  ) {}


  async login(dto: LoginUserDto): Promise<AuthResource> {
    const user = await this.em.findOne(User, { email: dto.email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');
    const { accessToken } = await this.generateTokens(user);
    return {
      user,
      accessToken,
    };
  }

  async generateTokens(user: User): Promise<{ accessToken: string }> {
    const payload: UserJWTPayload = { id: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // user.refreshToken = await bcrypt.hash(refreshToken, 10);
    // user.refreshTokenExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // await this.em.persistAndFlush(user);

    return {
      accessToken,
    };
  }

}

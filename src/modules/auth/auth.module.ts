import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      //this is just for test otherwise must read from env
      secret: 'super-secret',
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
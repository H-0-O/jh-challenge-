import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import OrmConfig from "./configs/orm.config"
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './modules/users/user.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(OrmConfig),

    UserModule
  ],

  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ]
})
export class AppModule {}

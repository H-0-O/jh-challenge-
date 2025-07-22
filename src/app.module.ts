import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import OrmConfig from "./configs/orm.config"
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserModule } from './modules/users/user.module';
import { TagModule } from './modules/tags/tag.module';
import { QuestionModule } from './modules/questions/questions.module';
import { AnswerModule } from './modules/answers/answer.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MikroOrmModule.forRoot(OrmConfig),

    UserModule,
    TagModule,
    QuestionModule,
    AnswerModule
  ],

  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    }
  ]
})
export class AppModule {}

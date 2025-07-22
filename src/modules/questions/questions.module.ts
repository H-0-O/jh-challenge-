import { Module } from "@nestjs/common";
import { QuestionController } from "./questions.controller";
import { QuestionService } from "./questions.service";
import { AnswerModule } from "../answers/answer.module";


@Module({
    controllers: [QuestionController],
    providers: [QuestionService],
    imports: [AnswerModule]
})
export class QuestionModule {

}
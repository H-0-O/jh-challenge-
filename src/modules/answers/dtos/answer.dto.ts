import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";



export class CreateAnswerDTO{
  @ApiProperty()
  @IsString()  
  content: string;
}


export class StatisticsResponseDTO {
  @ApiProperty({ description: 'Unique identifier of the statistic', example: 1 })
  readonly id: number;

  @ApiProperty({ description: 'Content or text associated with the statistic', example: 'This is an example content' })
  readonly content: string;

  @ApiProperty({ description: 'Number of votes received', example: 42 })
  readonly votes: number;

  constructor(id: number, content: string, votes: number) {
    this.id = id;
    this.content = content;
    this.votes = votes;
  }
}
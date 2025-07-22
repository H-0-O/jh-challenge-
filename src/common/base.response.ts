import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse<T> {
  @ApiProperty()
  private status: boolean;

  @ApiProperty({
    nullable: true,
  })
  data: T | null;

  @ApiProperty({
    nullable: true,
  })
  errors: string[] | null;

  constructor(status: boolean, data: T, errors: string[] | null) {
    this.status = status;
    this.data = data;
    this.errors = errors;
  }
}

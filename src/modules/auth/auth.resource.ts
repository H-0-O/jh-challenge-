
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { User } from "../users/entities/user.entity";

export class AuthResource {

  @ApiProperty()
  @Expose()
  user: User

  @ApiProperty()
  @Expose()
  accessToken: string

}
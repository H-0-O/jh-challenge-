import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        example: 'test@gmail.com'
    })
    @IsEmail()
    email: string

    @ApiProperty({
        example: '9l;]sdM3dH?3'
    })
    @IsString()
    @IsStrongPassword()
    password: string
}


export class LoginDTO {
    @ApiProperty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsString()
    password: string
}
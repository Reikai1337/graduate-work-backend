import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 20)
  login: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  initialRole: string;
}

import { IsString, IsNotEmpty, IsOptional, IsDate, IsPositive, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  surname: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  birthdate: Date;

  // Optional fields
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;
}

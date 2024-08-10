import { IsString, IsNotEmpty } from 'class-validator';

export class BlockDto {

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  blockUsername: string;

}

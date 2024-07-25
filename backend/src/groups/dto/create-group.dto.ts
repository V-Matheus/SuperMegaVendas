import { IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  name: String;

  @IsString()
  userId: String
}

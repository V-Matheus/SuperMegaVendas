import { IsString, IsNotEmpty } from 'class-validator';

export class CreateContactDto {
  @IsString()
  name: String;

  @IsString()
  phoneNumber: String;

  @IsNotEmpty()
  groupId: String;
}

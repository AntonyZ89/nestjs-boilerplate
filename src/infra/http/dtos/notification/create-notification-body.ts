import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({ example: '60c3a5d0-88c3-4784-8dc9-0ca82798a961' })
  recipientId: string;

  @IsNotEmpty()
  @Length(10, 100)
  @ApiProperty()
  content: string;

  @IsNotEmpty()
  @ApiProperty()
  category: string;
}

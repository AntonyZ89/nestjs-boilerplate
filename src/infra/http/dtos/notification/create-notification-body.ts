import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
  @IsNotEmpty()
  @ApiProperty()
  userId: number;

  @IsNotEmpty()
  @Length(10, 100)
  @ApiProperty()
  content: string;

  @IsNotEmpty()
  @ApiProperty()
  category: string;
}

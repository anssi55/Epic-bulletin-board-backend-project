import { IsString, MinLength, MaxLength, IsInt, IsNotEmpty } from 'class-validator';
import { replyMinLenght, replyMaxLenght } from '../constants';

class CreateReplyToReplyDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(replyMinLenght, {
    message: 'Topic is too short'
  })
  @MaxLength(replyMaxLenght, {
    message: 'Topic is too long'
  })
  reply!: string;

  @IsNotEmpty()
  @IsInt()
  userId!: number;

  @IsNotEmpty()
  @IsInt()
  replyId!: number;
}
export default CreateReplyToReplyDto;

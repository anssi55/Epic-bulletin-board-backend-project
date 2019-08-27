import { IsString, MinLength, MaxLength, IsInt, IsNotEmpty } from 'class-validator';
import { replyMinLenght, replyMaxLenght } from '../constants';

class CreateReplyToPostDto {
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
  postId!: number;
}
export default CreateReplyToPostDto;

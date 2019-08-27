import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { replyMinLenght, replyMaxLenght } from '../constants';

class UpdateReplyDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(replyMinLenght, {
    message: 'Topic is too short'
  })
  @MaxLength(replyMaxLenght, {
    message: 'Topic is too long'
  })
  reply!: string;
}
export default UpdateReplyDto;

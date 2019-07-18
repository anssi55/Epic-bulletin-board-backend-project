import { IsString, MinLength, MaxLength, IsBoolean, IsInt } from 'class-validator';

class CreateReplyToReplyDto {
  @IsString()
  @MinLength(2, {
    message: 'Topic is too short'
  })
  @MaxLength(255, {
    message: 'Topic is too long'
  })
  reply!: string;

  @IsInt()
  userId!: number;

  @IsInt()
  replyId!: number;
}
export default CreateReplyToReplyDto;

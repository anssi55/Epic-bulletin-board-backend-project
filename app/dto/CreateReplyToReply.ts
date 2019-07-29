import { IsString, MinLength, MaxLength, IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

class CreateReplyToReplyDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2, {
    message: 'Topic is too short'
  })
  @MaxLength(255, {
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

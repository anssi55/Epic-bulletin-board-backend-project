import { IsString, MinLength, MaxLength, IsInt } from 'class-validator';

class CreateReplyToPostDto {
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
  postId!: number;
}
export default CreateReplyToPostDto;

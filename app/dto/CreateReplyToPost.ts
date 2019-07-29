import { IsString, MinLength, MaxLength, IsInt, IsNotEmpty } from 'class-validator';

class CreateReplyToPostDto {
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
  postId!: number;
}
export default CreateReplyToPostDto;

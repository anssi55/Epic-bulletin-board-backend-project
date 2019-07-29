import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

class CreateLikeOnReplyDto {
  @IsNotEmpty()
  @IsBoolean()
  like!: boolean;

  @IsNotEmpty()
  @IsInt()
  userId!: number;

  @IsNotEmpty()
  @IsInt()
  replyId!: number;
}
export default CreateLikeOnReplyDto;

import { IsBoolean, IsInt } from 'class-validator';

class CreateLikeOnReplyDto {
  @IsBoolean()
  like!: boolean;

  @IsInt()
  userId!: number;

  @IsInt()
  replyId!: number;
}
export default CreateLikeOnReplyDto;

import { IsBoolean, IsInt } from 'class-validator';

class CreateLikeOnPostDto {
  @IsBoolean()
  like!: boolean;

  @IsInt()
  userId!: number;

  @IsInt()
  postId!: number;
}
export default CreateLikeOnPostDto;

import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

class CreateLikeOnPostDto {
  @IsNotEmpty()
  @IsBoolean()
  like!: boolean;

  @IsNotEmpty()
  @IsInt()
  userId!: number;

  @IsNotEmpty()
  @IsInt()
  postId!: number;
}
export default CreateLikeOnPostDto;

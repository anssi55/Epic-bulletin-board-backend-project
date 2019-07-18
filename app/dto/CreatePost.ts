import { IsString, MinLength, MaxLength, IsBoolean, IsInt } from 'class-validator';

class CreatePostDto {
  @IsString()
  @MinLength(5, {
    message: 'Topic is too short'
  })
  @MaxLength(50, {
    message: 'Topic is too long'
  })
  public topic!: string;

  @IsString()
  @MinLength(10, {
    message: 'Post is too short, min: 10'
  })
  @MaxLength(255, {
    message: 'Post is too long, max: 255'
  })
  public post!: string;

  @IsBoolean()
  public pinned!: boolean;

  @IsInt()
  public categoryId!: number;
}

export default CreatePostDto;
import { IsString, MinLength, MaxLength, IsBoolean, IsInt } from 'class-validator';

class UpdatePostDto {
  @IsInt()
  id!: number;
  @IsString()
  @MinLength(5, {
    message: 'Topic is too short'
  })
  @MaxLength(50, {
    message: 'Topic is too long'
  })
  public post!: string;

  @IsString()
  @IsString()
  @MinLength(10, {
    message: 'Post is too short, min: 10'
  })
  @MaxLength(255, {
    message: 'Post is too long, max: 255'
  })
  public topic!: string;

  @IsBoolean()
  public pinned!: string;
}

export default UpdatePostDto;

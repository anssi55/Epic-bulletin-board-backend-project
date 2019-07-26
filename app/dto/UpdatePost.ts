import { IsString, MinLength, MaxLength, IsBoolean } from 'class-validator';

class UpdatePostDto {
  @IsString()
  @MinLength(5, {
    message: 'Topic is too short'
  })
  @MaxLength(50, {
    message: 'Topic is too long'
  })
  topic!: string;

  @IsString()
  @IsString()
  @MinLength(10, {
    message: 'Post is too short, min: 10'
  })
  @MaxLength(255, {
    message: 'Post is too long, max: 255'
  })
  post!: string;

  @IsBoolean()
  pinned!: boolean;
}

export default UpdatePostDto;

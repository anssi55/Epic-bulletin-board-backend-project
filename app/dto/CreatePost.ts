import { IsString, MinLength, MaxLength, IsBoolean, IsInt, IsNotEmpty } from 'class-validator';
import {
  postPostMinLenght,
  postPostMaxLenght,
  postTopicMinLenght,
  postTopicMaxLenght
} from '../constants';

class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(postTopicMinLenght, {
    message: 'Topic is too short'
  })
  @MaxLength(postTopicMaxLenght, {
    message: 'Topic is too long'
  })
  public topic!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(postPostMinLenght, {
    message: 'Post is too short, min: 10'
  })
  @MaxLength(postPostMaxLenght, {
    message: 'Post is too long, max: 255'
  })
  public post!: string;

  @IsNotEmpty()
  @IsBoolean()
  public pinned!: boolean;

  @IsNotEmpty()
  @IsInt()
  public categoryId!: number;
}

export default CreatePostDto;

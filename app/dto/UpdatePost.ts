import { IsString, MinLength, MaxLength, IsBoolean, IsNotEmpty } from 'class-validator';
import {
  postPostMinLenght,
  postPostMaxLenght,
  postTopicMinLenght,
  postTopicMaxLenght
} from '../constants';

class UpdatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(postTopicMinLenght, {
    message: 'Topic is too short'
  })
  @MaxLength(postTopicMaxLenght, {
    message: 'Topic is too long'
  })
  topic!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(postPostMinLenght, {
    message: 'Post is too short, min: 10'
  })
  @MaxLength(postPostMaxLenght, {
    message: 'Post is too long, max: 255'
  })
  post!: string;

  @IsNotEmpty()
  @IsBoolean()
  pinned!: boolean;
}

export default UpdatePostDto;

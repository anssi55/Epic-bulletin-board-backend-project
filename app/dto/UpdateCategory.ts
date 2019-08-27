import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import {
  categoryNameMinLenght,
  categoryNameMaxLenght,
  categoryDescriptionMinLenght,
  categoryDescriptionMaxLenght
} from '../constants';

class UpdateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(categoryNameMinLenght, {
    message: 'Name is too short'
  })
  @MaxLength(categoryNameMaxLenght, {
    message: 'Name is too long'
  })
  name!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(categoryDescriptionMinLenght, {
    message: 'Description is too short'
  })
  @MaxLength(categoryDescriptionMaxLenght, {
    message: 'Description is too long'
  })
  description!: string;
}

export default UpdateCategoryDto;

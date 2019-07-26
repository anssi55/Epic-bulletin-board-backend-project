import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

class CreateCategoryDto {
  @IsString()
  @MinLength(2, {
    message: 'Name is too short'
  })
  @MaxLength(50, {
    message: 'Name is too long'
  })
  name!: string;

  @IsString()
  @MinLength(10, {
    message: 'Description is too short'
  })
  @MaxLength(50, {
    message: 'Description is too long'
  })
  description!: string;
}

export default CreateCategoryDto;

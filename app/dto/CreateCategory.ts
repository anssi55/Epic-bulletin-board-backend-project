import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2, {
    message: 'Name is too short'
  })
  @MaxLength(50, {
    message: 'Name is too long'
  })
  name!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10, {
    message: 'Description is too short'
  })
  @MaxLength(80, {
    message: 'Description is too long'
  })
  description!: string;
}

export default CreateCategoryDto;

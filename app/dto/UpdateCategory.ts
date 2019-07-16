import { IsString, MinLength, MaxLength, IsInt, Length } from 'class-validator';

class UpdateCategoryDto {
  @Length(1, 11)
  @IsInt()
  id!: number;
  @IsString()
  @MinLength(2, {
    message: 'Name is too short'
  })
  @MaxLength(50, {
    message: 'Name is too long'
  })
  public name!: string;

  @IsString()
  @MinLength(10, {
    message: 'Description is too short'
  })
  @MaxLength(50, {
    message: 'Description is too long'
  })
  public description!: string;
}

export default UpdateCategoryDto;

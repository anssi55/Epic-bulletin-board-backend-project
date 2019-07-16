import { IsBoolean, IsInt } from 'class-validator';

class UpdateLikeDto {
  @IsBoolean()
  like!: boolean;

  @IsInt()
  id!: number;
}
export default UpdateLikeDto;

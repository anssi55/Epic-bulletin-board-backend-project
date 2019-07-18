import { IsBoolean, IsInt } from 'class-validator';

class UpdateLikeDto {
  @IsBoolean()
  like!: boolean;
}
export default UpdateLikeDto;

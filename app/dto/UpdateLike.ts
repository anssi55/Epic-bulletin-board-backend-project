import { IsBoolean, IsNotEmpty } from 'class-validator';

class UpdateLikeDto {
  @IsNotEmpty()
  @IsBoolean()
  like!: boolean;
}
export default UpdateLikeDto;

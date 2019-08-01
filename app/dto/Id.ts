import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

class IdDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  id!: number;
}
export default IdDto;

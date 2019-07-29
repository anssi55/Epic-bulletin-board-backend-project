import { IsInt, IsNotEmpty } from 'class-validator';

class IdDto {
  @IsNotEmpty()
  @IsInt()
  id!: number;
}
export default IdDto;

import { IsInt } from 'class-validator';

class IdDto {
  @IsInt()
  id!: number;
}
export default IdDto;

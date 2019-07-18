import { IsString, MinLength, MaxLength, IsInt } from 'class-validator';

class UpdateReplyDto {
  @IsString()
  @MinLength(2, {
    message: 'Topic is too short'
  })
  @MaxLength(255, {
    message: 'Topic is too long'
  })
  reply!: string;
}
export default UpdateReplyDto;

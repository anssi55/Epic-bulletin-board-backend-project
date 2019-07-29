import { IsString, IsBoolean, IsInt, IsUrl, Contains, IsNotEmpty } from 'class-validator';
import { Type, Transform } from 'class-transformer';

class EnvVariables {
  @IsNotEmpty()
  @IsUrl({ require_tld: false })
  @IsString()
  DB_HOST!: string;

  @IsNotEmpty()
  @IsString()
  DB_USERNAME!: string;

  @IsNotEmpty()
  @IsString()
  DB_PASSWORD!: string;

  @IsNotEmpty()
  @IsString()
  DB_DATABASE!: string;

  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  DB_PORT!: number;

  @IsNotEmpty()
  @IsBoolean()
  @Transform(value => value == 'true')
  DB_SYNC!: boolean;

  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  PORT!: number;
}
export default EnvVariables;

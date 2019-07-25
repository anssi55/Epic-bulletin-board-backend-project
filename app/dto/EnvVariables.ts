import { IsString, IsBoolean, IsInt, IsUrl, Contains } from 'class-validator';

class EnvVariables {
  @IsUrl({ require_tld: false })
  @IsString()
  DB_HOST!: string;

  @IsString()
  DB_USERNAME!: string;

  @IsString()
  DB_PASSWORD!: string;

  @IsString()
  DB_DATABASE!: string;

  @IsString()
  DB_PORT!: string;

  @IsString()
  DB_SYNC!: string;

  @IsString()
  PORT!: string;
}
export default EnvVariables;

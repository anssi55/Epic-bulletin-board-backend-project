import { MinLength, IsString, IsNotEmpty, MaxLength, IsEmail } from 'class-validator';

class User {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: 'Username is too short'
  })
  @MaxLength(20, {
    message: 'UserName is too long'
  })
  username!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'Password is too short'
  })
  @MaxLength(25, {
    message: 'Password is too long'
  })
  password!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  avatar!: string;
}
export default User;

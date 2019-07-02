import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { IsInt, IsString, Min, MinLength, MaxLength, IsEmail } from 'class-validator';

@Entity()
export class Users {
    @IsInt() 
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @MinLength(3, {
        message: "Name is too short"
    })
    @MaxLength(20, {
        message: "Name is too long"
    })
    @Column()
    username: string;

    @IsEmail()
    @Column()
    email: string;

    @IsString()
    @Column()
    password: string;

    @IsString()
    @Column()
    avatar: string;

}
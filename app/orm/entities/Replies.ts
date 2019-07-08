import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne} from 'typeorm';
import {validate, Contains, IsOptional, IsInt, Length, IsDate, Min, Max, MinLength, MaxLength, IsBoolean, IsString, IsIn} from "class-validator";
import { Users } from './Users';

@Entity()
export class Replies {
    @IsInt()
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @MinLength(2, {
        message: "Topic is too short"
    })
    @MaxLength(255, {
        message: "Topic is too long"
    })
    @Column()
    reply: string;

    @IsDate()
    @Column()
    datetime: Date;

    @IsInt()
    @OneToOne(type => Users)
    @JoinColumn()
    users: Users;
}
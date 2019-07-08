import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import {IsInt, Length, MinLength, MaxLength, IsBoolean, } from "class-validator";
import { Users } from './Users';
import { Replies } from './Replies';

@Entity()
export class LikesOnReplies {
    @Length(1, 11)
    @IsInt()
    @PrimaryGeneratedColumn()
    id: number;

    @IsBoolean()
    @Column()
    like: boolean;

    @IsInt()
    @OneToOne(type => Replies)
    @JoinColumn()
    replies: Replies;

    @IsInt()
    @OneToOne(type => Users)
    @JoinColumn()
    users: Users;

}
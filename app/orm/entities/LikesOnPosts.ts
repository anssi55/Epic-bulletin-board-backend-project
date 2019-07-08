import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn} from 'typeorm';
import {IsInt, Length, IsBoolean, } from "class-validator";
import { Users } from './Users';
import { Posts } from './Posts';

@Entity()
export class LikesOnPosts {
    @Length(1, 11)
    @IsInt()
    @PrimaryGeneratedColumn()
    id: number;

    @IsBoolean()
    @Column()
    like: boolean;

    @IsInt()
    @OneToOne(type => Posts)
    @JoinColumn()
    Post: Posts;

    @IsInt()
    @OneToOne(type => Users)
    @JoinColumn()
    users: Users;

}
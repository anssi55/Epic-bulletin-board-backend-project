import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import { IsInt, IsString, Min, MinLength, MaxLength, IsEmail } from 'class-validator';
import { Reply } from './Reply';
import { Post } from './Post';
import { LikeOnPost as LikeOnPost } from './LikeOnPost';
import { LikeOnReply as LikeOnReply } from './LikeOnReply';

@Entity()
export class User {
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

    @OneToMany(type => Reply, reply => reply.user)
    replies: Reply[]

    @OneToMany(type => Post, post => post.user)
    posts: Post[]

    @OneToMany(type => LikeOnReply, likeOnReply => likeOnReply.user)
    replylikes: LikeOnReply[]

    @OneToMany(type => LikeOnPost, like => like.user)
    postlikes: LikeOnPost[]
}
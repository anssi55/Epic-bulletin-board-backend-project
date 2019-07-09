import {Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne, ManyToMany, JoinTable, ManyToOne, OneToMany} from 'typeorm';
import {validate, Contains, IsOptional, IsInt, Length, IsDate, Min, Max, MinLength, MaxLength, IsBoolean, IsString, IsIn} from "class-validator";
import { User } from './User';
import { Post } from './Post';
import { LikeOnReply } from './LikeOnReply';

@Entity()
export class Reply {
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

    
    @ManyToOne(type => User, users => users.replies)
    user: User;

    
    @ManyToMany(type => Reply, replies => replies.replyto)
    @JoinTable()
    replyto: Reply[];

    

    @ManyToOne(type => Post, posts => posts.replies)
    post: Post;

    @OneToMany(type => LikeOnReply, likesonreplies => likesonreplies.reply)
    likes: LikeOnReply[];

}
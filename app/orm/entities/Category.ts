import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';
import {IsInt, Length, MinLength, MaxLength} from "class-validator";
import { Post } from './Post';

@Entity()
export class Category {
    @Length(1, 11)
    @IsInt()
    @PrimaryGeneratedColumn()
    id: number;

    @MinLength(2, {
        message: "Title is too short"
    })
    @MaxLength(50, {
        message: "Title is too long"
    })
    @Column()
    name: string;

    @MinLength(10, {
        message: "Description is too short"
    })
    @MaxLength(50, {
        message: "Description is too long"
    })
    @Column()
    description: string;

    @OneToMany(type => Post, post => post.category)
    posts: Post[];
}
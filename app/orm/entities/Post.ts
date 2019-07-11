import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import {
  IsOptional,
  IsInt,
  IsDate,
  MinLength,
  MaxLength,
  IsBoolean,
  IsString
} from 'class-validator';
import Reply from './Reply';
import LikeOnPost from './LikeOnPost';
import Category from './Category';
import User from './User';

@Entity()
class Post {
  @IsOptional()
  @IsInt()
  @PrimaryGeneratedColumn()
  id!: number;

  @IsString()
  @MinLength(5, {
    message: 'Topic is too short'
  })
  @MaxLength(50, {
    message: 'Topic is too long'
  })
  @Column()
  topic!: string;

  @IsString()
  @MinLength(10, {
    message: 'Post is too short, min: 10'
  })
  @MaxLength(255, {
    message: 'Post is too long, max: 255'
  })
  @Column()
  post!: string;
  @IsOptional()
  @IsDate({
    message: 'Invalid date'
  })
  @IsOptional()
  @Column()
  datetime!: Date;

  @IsBoolean()
  @Column()
  pinned!: Boolean;

  @IsDate()
  @Column()
  modified!: Date;

  @ManyToOne(type => User, user => user.replies)
  user!: User;

  @IsInt({
    message: 'Category must be an integer number'
  })
  @ManyToOne(type => Category, category => category.posts)
  category!: Category;

  @OneToMany(type => Reply, reply => reply.post)
  replies!: Reply[];

  @OneToMany(type => LikeOnPost, likeonpost => likeonpost.post)
  likes!: LikeOnPost[];
}
export default Post;

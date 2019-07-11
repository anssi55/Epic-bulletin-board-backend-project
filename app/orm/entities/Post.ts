import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import Category from './Category';
import User from './User';
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

@Entity()
class Post {
  @IsOptional()
  @IsInt()
  @PrimaryGeneratedColumn()
  id!: number;

  @IsString()
  @MinLength(10, {
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

  @IsDate({
    message: 'Invalid date'
  })
  @Column()
  datetime!: Date;

  @IsBoolean()
  @Column()
  pinned!: Boolean;

  @ManyToOne(type => User, user => user.replies)
  user!: User;

  @IsInt({
    message: 'Category must be an integer number'
  })
  @ManyToOne(type => Category, categories => categories.posts)
  categories!: Category;

  @OneToMany(type => Reply, replies => replies.post)
  replies!: Reply[];

  @OneToMany(type => LikeOnPost, likesonposts => likesonposts.post)
  likes!: LikeOnPost[];
}
export default Post;

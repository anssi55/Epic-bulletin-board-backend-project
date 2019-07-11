import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsInt, Length, IsBoolean } from 'class-validator';
import { User } from './User';
import { Post } from './Post';

@Entity()
export class LikeOnPost {
  @Length(1, 11)
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @IsBoolean()
  @Column()
  like: boolean;

  @ManyToOne(type => Post, post => post.likes)
  post: Post;

  @ManyToOne(type => User, user => user.postlikes)
  user: User;
}

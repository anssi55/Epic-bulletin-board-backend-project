import { IsDate, IsInt, IsString, MaxLength, MinLength } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import LikeOnReply from './LikeOnReply';
import Post from './Post';
import User from './User';

@Entity()
class Reply {
  @IsInt()
  @PrimaryGeneratedColumn()
  id!: number;

  @IsString()
  @MinLength(2, {
    message: 'Topic is too short'
  })
  @MaxLength(255, {
    message: 'Topic is too long'
  })
  @Column()
  reply!: string;

  @IsDate()
  @Column()
  datetime!: Date;

  @ManyToOne(type => User, users => users.replies)
  user!: User;

  @ManyToMany(type => Reply, replies => replies.replyto)
  @JoinTable()
  replyto!: Reply[];

  @ManyToOne(type => Post, posts => posts.replies)
  post!: Post;

  @OneToMany(type => LikeOnReply, likesonreplies => likesonreplies.reply)
  likes!: LikeOnReply[];
}
export default Reply;

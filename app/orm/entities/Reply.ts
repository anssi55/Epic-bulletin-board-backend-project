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
import { LikeOnReply } from './LikeOnReply';
import { Post } from './Post';
import { User } from './User';

@Entity()
export class Reply {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @MinLength(2, {
    message: 'Topic is too short'
  })
  @MaxLength(255, {
    message: 'Topic is too long'
  })
  @Column()
  reply: string;

  @IsDate()
  @Column()
  datetime: Date;

  @ManyToOne(type => User, user => user.replies)
  user: User;

  @ManyToMany(type => Reply, reply => reply.replyto)
  @JoinTable()
  replyto: Reply[];

  @ManyToOne(type => Post, post => post.replies)
  post: Post;

  @OneToMany(type => LikeOnReply, likeonreply => likeonreply.reply)
  likes: LikeOnReply[];
}

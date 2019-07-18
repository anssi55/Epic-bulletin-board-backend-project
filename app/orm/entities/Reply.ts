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
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  reply!: string;

  @Column()
  datetime!: Date;

  @ManyToOne(type => User, user => user.replies)
  user!: User;

  @ManyToMany(type => Reply, reply => reply.replyto)
  @JoinTable()
  replyto!: Reply[];

  @ManyToOne(type => Post, post => post.replies)
  post!: Post;

  @OneToMany(type => LikeOnReply, likeonreply => likeonreply.reply)
  likes!: LikeOnReply[];
}
export default Reply;

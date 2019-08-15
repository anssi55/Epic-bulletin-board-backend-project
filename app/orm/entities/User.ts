import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';
import Reply from './Reply';
import Post from './Post';
import LikeOnPost from './LikeOnPost';
import LikeOnReply from './LikeOnReply';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Expose()
  @Column()
  username!: string;

  @Expose()
  @Column()
  email!: string;

  @Expose()
  @Column()
  password!: string;

  @Column()
  created!: Date;

  @Column({ nullable: true })
  modified!: Date;

  @Expose()
  @Column({ nullable: true })
  avatar!: string;

  @OneToMany(type => Reply, reply => reply.user)
  replies!: Reply[];

  @OneToMany(type => Post, post => post.user)
  posts!: Post[];

  @OneToMany(type => LikeOnReply, likeOnReply => likeOnReply.user)
  replylikes!: LikeOnReply[];

  @OneToMany(type => LikeOnPost, like => like.user)
  postlikes!: LikeOnPost[];
}
export default User;

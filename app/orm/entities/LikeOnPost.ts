import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import User from './User';
import Post from './Post';

@Entity()
class LikeOnPost {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  like!: boolean;

  @ManyToOne(type => Post, post => post.likes)
  post!: Post;

  @ManyToOne(type => User, user => user.postlikes)
  user!: User;
}
export default LikeOnPost;

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import Reply from './Reply';
import LikeOnPost from './LikeOnPost';
import Category from './Category';
import User from './User';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  topic!: string;

  @Column()
  post!: string;

  @Column()
  datetime!: Date;

  @Column()
  pinned!: Boolean;

  @Column()
  modified!: Date;

  @ManyToOne(type => User, user => user.replies)
  user!: User;

  @ManyToOne(type => Category, category => category.posts)
  category!: Category;

  @OneToMany(type => Reply, reply => reply.post)
  replies!: Reply[];

  @OneToMany(type => LikeOnPost, likeonpost => likeonpost.post)
  likes!: LikeOnPost[];
}
export default Post;

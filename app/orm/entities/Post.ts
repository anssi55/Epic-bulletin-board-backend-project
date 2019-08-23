import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';
import Reply from './Reply';
import LikeOnPost from './LikeOnPost';
import Category from './Category';
import User from './User';

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Expose()
  @Column()
  topic!: string;

  @Expose()
  @Column()
  post!: string;

  @Column()
  created!: Date;

  @Expose()
  @Column()
  pinned!: Boolean;

  @Column({ nullable: true })
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

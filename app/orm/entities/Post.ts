import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';
import Reply from './Reply';
import LikeOnPost from './LikeOnPost';
import Category from './Category';
import User from './User';

@Entity()
class Post {
  @Expose()
  @PrimaryGeneratedColumn()
  id!: number;

  @Expose()
  @Column()
  topic!: string;

  @Expose()
  @Column()
  post!: string;

  @Expose()
  @Column()
  datetime!: Date;

  @Expose()
  @Column()
  pinned!: Boolean;

  @Expose()
  @Column({ nullable: true })
  modified!: Date;

  @Expose()
  @ManyToOne(type => User, user => user.replies)
  user!: User;

  @Expose()
  @ManyToOne(type => Category, category => category.posts)
  category!: Category;

  @Expose()
  @OneToMany(type => Reply, reply => reply.post)
  replies!: Reply[];

  @Expose()
  @OneToMany(type => LikeOnPost, likeonpost => likeonpost.post)
  likes!: LikeOnPost[];
}
export default Post;

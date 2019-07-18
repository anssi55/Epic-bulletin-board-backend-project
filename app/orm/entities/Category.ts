import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Post from './Post';

@Entity()
class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @OneToMany(type => Post, post => post.category)
  posts!: Post[];
}
export default Category;

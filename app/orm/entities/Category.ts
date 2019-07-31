import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Expose } from 'class-transformer';
import Post from './Post';

@Entity()
class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Expose()
  @Column()
  name!: string;

  @Expose()
  @Column()
  description!: string;

  @OneToMany(type => Post, post => post.category)
  posts!: Post[];
}
export default Category;

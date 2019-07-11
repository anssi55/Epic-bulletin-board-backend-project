import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IsInt, Length, IsBoolean } from 'class-validator';
import User from './User';
import Reply from './Reply';

@Entity()
class LikeOnReply {
  @Length(1, 11)
  @IsInt()
  @PrimaryGeneratedColumn()
  id!: number;

  @IsBoolean()
  @Column()
  like!: boolean;

  @IsInt()
  @ManyToOne(type => Reply, reply => reply.likes)
  reply!: Reply;

  @ManyToOne(type => User, user => user.postlikes)
  user!: User;
}
export default LikeOnReply;

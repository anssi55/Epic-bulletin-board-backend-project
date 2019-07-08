import {OneToOne, JoinColumn, Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { Categories } from './Categories';
import { Users } from './Users';

@Entity()
export class Posts {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    topic: string;

    @Column()
    post: string;

    @Column()
    datetime: Date;

    @OneToOne(type => Users)
    @JoinColumn()
    users: Users;

    @OneToOne(type => Categories)
    @JoinColumn()
    categories: Categories;

}
import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Replies {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reply: string;

    @Column()
    datetime: Date;

    @Column()
    userId: number;
}
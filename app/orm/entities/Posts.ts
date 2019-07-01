import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

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

    @Column()
    userId: number;

    @Column()
    categoriesId: number;

}
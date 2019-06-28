import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    topic: string;

    @Column()
    post: string;

    @Column()
    datetime: Date;

    //@Column()
    //userId: Date;

    //@Column()
    //categoriesId: Date;

}
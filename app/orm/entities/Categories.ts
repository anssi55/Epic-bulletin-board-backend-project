import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import {validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, MinLength, MaxLength} from "class-validator";

@Entity()
export class Categories {
    @Length(1, 11)
    @IsInt()
    @PrimaryGeneratedColumn()
    id: number;

    @MinLength(2, {
        message: "Title is too short"
    })
    @MaxLength(50, {
        message: "Title is too long"
    })
    @Column()
    name: string;

    @MinLength(10, {
        message: "Description is too short"
    })
    @MaxLength(50, {
        message: "Description is too long"
    })
    @Column()
    description: string;

}
import {OneToOne, JoinColumn, Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { Categories } from './Categories';
import { Users } from './Users';
import {validate, Contains, IsOptional, IsInt, Length, IsDate, Min, Max, MinLength, MaxLength, IsBoolean, IsString} from "class-validator";

@Entity()
export class Posts {
    @IsOptional()
    @IsInt()
    @PrimaryGeneratedColumn()
    id: number;
    
    @IsString()
    @MinLength(10, {
        message: "Topic is too short"
    })
    @MaxLength(50, {
        message: "Topic is too long"
    })
    @Column()
    topic: string;
    
    @IsString()
    @MinLength(10, {
        message: "Post is too short, min: 10"
    })
    @MaxLength(255, {
        message: "Post is too long, max: 255"
    })
    @Column()
    post: string;
    
    @IsDate( {
        message: "Invalid date"
    })
    @Column()
    datetime: Date;

    @IsBoolean()
    @Column()
    pinned: Boolean;
    
    @IsOptional()
    @IsInt()
    @OneToOne(type => Users)
    @JoinColumn()
    users: Users;

    @IsInt()
    @OneToOne(type => Categories)
    @JoinColumn()
    categories: Categories;

}
'use strict';
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from 'express';
import { getRepository } from "typeorm";
import ErrorHandler from '../middleware/errorhandler';
import { Post } from "../orm/entities/Post";


//Router to route /posts-route
class PostsRouter {


    //get all posts from database
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            let results = await getRepository(Post).find();
            res.status(200).send(results);
        } catch(error) {
            res.status(400).send({"message": "Couldn't get the data",
        "Error": error });
         
        }
        
    }
    //get specific post from database
    public getOne(req: Request, res: Response, next: NextFunction) {
        res.send("Nothing");
    }
    //Add new post to database
    public async create(req: Request, res: Response, next: NextFunction) {
        let ehandler = new ErrorHandler();
        let errors;
        try {  
            let post = new Post();
            post.topic = req.body.topic;
            post.post = req.body.post;
            post.datetime = new Date(Date.now());
            post.categories = req.body.categoryId;
            post.pinned = req.body.pinned;
            
            let validateErrors: ValidationError[] = await validate(post);
            
            if(validateErrors.length > 0) {
                errors = ehandler.handleValidationErrors(validateErrors);
                throw 400;
            }
            let postRepository = getRepository(Post);
            await postRepository.save(post);
            
            res.status(200).send(post);
        } catch(error) {
            if (error === 400) {
                res.status(400).send(errors)
            } else {
                res.status(400).send({message: "Couldn't save the data", "Error": error.message});
            }
        }
        
        
            
        
    }
    //Modify a post in database
    public update(req: Request, res: Response, next: NextFunction) {
        res.send("Nothing");
    }
    //Delete a post from database
    public delete(req: Request, res: Response, next: NextFunction) {
        res.send("Nothing");
    }
    
    
}


export default PostsRouter;

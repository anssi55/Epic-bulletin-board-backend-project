'use strict';
import {Router, Request, Response, NextFunction} from 'express';
import {Posts} from "../orm/entities/Posts";
import {getRepository} from "typeorm";
import {validate} from "class-validator";
const awilix = require('awilix');




//Router to route /posts-route
class PostsRouter {
    router: Router

    constructor() {
        this.router = Router();
    }

    //get all posts from database
    public async getAll(req: Request, res: Response, next: NextFunction) {
        console.log('lol');
        try {
            let results = await getRepository(Posts).find();
            res.status(200).send(results);
        } catch(error) {
            res.status(400).send({"message": "Couldn't get the data"});
         
        }
        
    }
    //get specific post from database
    public getOne(req: Request, res: Response, next: NextFunction) {
        res.send("Nothing");
    }
    //Add new post to database
    public async create(req: Request, res: Response, next: NextFunction) {
        let validateErrors;
        try {  
            let post = new Posts();
            post.topic = req.body.topic;
            post.post = req.body.post;
            post.datetime = new Date(Date.now());
            post.categories = req.body.categoryId;
            post.users = req.body.userId;
            post.pinned = req.body.pinned;
            console.log(post);
            validateErrors = await validate(post);
            if(validateErrors.length > 0) {
                throw 400;
            }
            let postRepository = getRepository(Posts);
            let sqlErrors = await postRepository.save(post);
            console.log(sqlErrors);
            res.status(200).send(post);
        } catch(error) {
            if (error === 400) {
                res.status(400).send({errors: validateErrors})
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
    init() {
        this.router.get('/api/v1/posts', this.getAll);
        this.router.get('/api/v1/posts/:id', this.getOne);
        this.router.post('/api/v1/posts', this.create);
        this.router.delete('/api/v1/posts/:id', this.delete);
        this.router.put('/api/v1/posts/:id', this.update);
    }
}



export default PostsRouter;

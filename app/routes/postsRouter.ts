'use strict';
import {Router, Request, Response, NextFunction} from 'express';
import {Posts} from "../orm/entities/Posts";
import {getRepository} from "typeorm";
import {validate} from "class-validator";
const awilix = require('awilix');


const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
})

export class PostsRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            let results = await getRepository(Posts).find();
            res.status(200).send(results);
        } catch(error) {
            res.status(400).send({"message": "Couldn't get the data"});
         
        }
        
    }
    public getOne(req: Request, res: Response, next: NextFunction) {
        res.send("Nothing");
    }
    public async create(req: Request, res: Response, next: NextFunction) {
        let validateErrors;
        let sqlErrors;
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
    public update(req: Request, res: Response, next: NextFunction) {
        res.send("Nothing");
    }
    public delete(req: Request, res: Response, next: NextFunction) {
        res.send("Nothing");
    }
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.post('/', this.create);
        this.router.delete('/:id', this.delete);
        this.router.put('/:id', this.update);
    }
}

container.register({
    postsController: awilix.asClass(PostsRouter),
    Posts: awilix.asClass(Posts)
  })

const postsRouter = new PostsRouter();
postsRouter.init();

export default postsRouter.router;

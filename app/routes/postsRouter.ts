'use strict';
import {Router, Request, Response, NextFunction, response} from 'express';
import {Posts} from "../orm/entities/Posts";
import {getRepository} from "typeorm";
const awilix = require('awilix')


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
    public create(req: Request, res: Response, next: NextFunction) {
        try {  
        let post = new Posts();
        post.topic = req.body.topic;
        post.post = req.body.post;
        post.datetime = new Date(Date.now());
        post.categories = req.body.categoriesId;
        let catalogRepository = getRepository(Posts);
        catalogRepository.save(post);
        res.send(post);
        } catch(error) {
            res.status(400).send({"message": "Couldn't save the data"});
     
        }
        
        console.log("Post has been saved");
            
        
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
    postsController: awilix.asClass(PostsRouter)
  })

const postsRouter = new PostsRouter();
postsRouter.init();

export default postsRouter.router;

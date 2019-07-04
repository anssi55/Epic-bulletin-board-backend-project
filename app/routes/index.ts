'use strict';
import {Router, Request, Response, NextFunction} from 'express';
const awilix = require('awilix');
import PostsRouter from './postsRouter';
//TODO. Routers not ready yet
//import authRouter from './authRouter';
//import repliesRouter from './repliesRouter';
//import userRouter from './userRouter';
import categoriesRouter from './categoriesRouter';



const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
})

// class to route all the REST-api paths

export class Index {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }
    
    // Root path response
    public rootPath(req: Request, res: Response, next: NextFunction) {
        res.send({message: 'Server is up and running'});
    }
    
    // Catching api-calls with bad address
    public notFound(req: Request, res: Response, next: NextFunction) {
        res.status(404).send({message:'Path not found'});
    }
    
    //Routing all the addresses to right path
    init() {
        this.router.get('/', this.rootPath);
        this.router.use('/api/v1/posts', PostsRouter);
        this.router.use('/api/v1/categories', categoriesRouter);
       // this.router.use('/api/v1/replies', repliesRouter);
       // this.router.use('/api/v1/auth', authRouter);
       // this.router.use('/api/v1/users', usersRouter);
        this.router.all('*', this.notFound);
    }
}

container.register({
    Index: awilix.asClass(Index)
})

const index = new Index();
index.init();
    
export default index.router;
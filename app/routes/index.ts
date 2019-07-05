'use strict';
import {Router, Request, Response, NextFunction} from 'express';
//TODO. Routers not ready yet
//import authRouter from './authRouter';
//import repliesRouter from './repliesRouter';
//import userRouter from './userRouter';
import categoriesRouter from './categoriesRouter';
import container from '../dic';
import PostsRouter from './postsRouter';






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
    public routePosts() {
        const p = container.resolve<PostsRouter>('postsController');
        this.router.route("/api/v1/posts")
        .get(p.getAll)
        .post(p.create)
        this.router.route("/api/v1/posts/:id")
        .get(p.getOne)
        .put(p.update)
        .delete(p.delete)
    }
    
    //Routing all the addresses to right path
    init() {
        container.resolve<PostsRouter>('postsController');
        this.router.get('/', this.rootPath);
        this.routePosts();
        this.router.use('/api/v1/categories', categoriesRouter);
       // this.router.use('/api/v1/replies', repliesRouter);
       // this.router.use('/api/v1/auth', authRouter);
       // this.router.use('/api/v1/users', usersRouter);
        this.router.all('*', this.notFound);
    }
}



const index = new Index();
index.init();
    
export default index;
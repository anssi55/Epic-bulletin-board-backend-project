'use strict';
import {Router, Request, Response, NextFunction, response} from 'express';

export class PostsRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        res.send("Nothing");
    }
    public getOne(req: Request, res: Response, next: NextFunction) {
        res.send("Nothing");
    }
    public create(req: Request, res: Response, next: NextFunction) {
        res.send("Nothing");
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

const postsRouter = new PostsRouter();
postsRouter.init();

export default postsRouter.router;

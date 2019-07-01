'use strict';
import {Router, Request, Response, NextFunction, response} from 'express';
import {Posts} from "../orm/Posts";
import {getRepository} from "typeorm";
var mysql = require('mysql');


export class PostsRouter {
    router: Router

    constructor() {
        this.router = Router();
        this.init();
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        var con = mysql.createConnection({user: "newuser",
        password : "password",
        database : "bulletinboard",
        host    : "localhost"});
        var sql = 'SELECT * FROM posts';

        con.query(sql, function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).send({message:'Unable to retrieve tasks'});
        } 
        res.status(200).send(results);
});
        
    }
    public getOne(req: Request, res: Response, next: NextFunction) {
        res.send("Nothing");
    }
    public create(req: Request, res: Response, next: NextFunction) {
        
        let post = new Posts();
        post.topic = req.body.topic;
        post.post = req.body.post;
        post.datetime = new Date(Date.now());
        post.categoriesId = req.body.categoriesId;
        res.send(post);

        
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

const postsRouter = new PostsRouter();
postsRouter.init();

export default postsRouter.router;

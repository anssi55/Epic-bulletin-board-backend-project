'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Posts_1 = require("../orm/Posts");
var mysql = require('mysql');
var PostsRouter = /** @class */ (function () {
    function PostsRouter() {
        this.router = express_1.Router();
        this.init();
    }
    PostsRouter.prototype.getAll = function (req, res, next) {
        var con = mysql.createConnection({ user: "newuser",
            password: "password",
            database: "bulletinboard",
            host: "localhost" });
        var sql = 'SELECT * FROM posts';
        con.query(sql, function (err, results) {
            if (err) {
                console.log(err);
                res.status(500).send({ message: 'Unable to retrieve tasks' });
            }
            res.status(200).send(results);
        });
    };
    PostsRouter.prototype.getOne = function (req, res, next) {
        res.send("Nothing");
    };
    PostsRouter.prototype.create = function (req, res, next) {
        var post = new Posts_1.Posts();
        post.topic = req.body.topic;
        post.post = req.body.post;
        post.datetime = new Date(Date.now());
        post.categoriesId = req.body.categoriesId;
        res.send(post);
        console.log("Post has been saved");
    };
    PostsRouter.prototype.update = function (req, res, next) {
        res.send("Nothing");
    };
    PostsRouter.prototype.delete = function (req, res, next) {
        res.send("Nothing");
    };
    PostsRouter.prototype.init = function () {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        this.router.post('/', this.create);
        this.router.delete('/:id', this.delete);
        this.router.put('/:id', this.update);
    };
    return PostsRouter;
}());
exports.PostsRouter = PostsRouter;
var postsRouter = new PostsRouter();
postsRouter.init();
exports.default = postsRouter.router;
//# sourceMappingURL=postsRouter.js.map
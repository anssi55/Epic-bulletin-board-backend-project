'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var PostsRouter = /** @class */ (function () {
    function PostsRouter() {
        this.router = express_1.Router();
        this.init();
    }
    PostsRouter.prototype.getAll = function (req, res, next) {
        res.send("Nothing");
    };
    PostsRouter.prototype.getOne = function (req, res, next) {
        res.send("Nothing");
    };
    PostsRouter.prototype.create = function (req, res, next) {
        res.send("Nothing");
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

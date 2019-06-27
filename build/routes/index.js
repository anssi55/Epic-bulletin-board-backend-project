'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var postsRouter_1 = __importDefault(require("./postsRouter"));
var Index = /** @class */ (function () {
    function Index() {
        this.router = express_1.Router();
        this.init();
    }
    Index.prototype.rootPath = function (req, res, next) {
        res.send({ msg: 'Server is up and running' });
    };
    Index.prototype.notFound = function (req, res, next) {
        res.status(404).send({ msg: 'not found' });
    };
    Index.prototype.init = function () {
        this.router.get('/', this.rootPath);
        this.router.all('/posts', postsRouter_1.default);
        this.router.all('*', this.notFound);
        // this.router.all('/categories', categoriesRouter);
        // this.router.all('/replies', repliesRouter);
        // this.router.all('/auth', authRouter);
        // this.router.all('/users', usersRouter);
    };
    return Index;
}());
exports.Index = Index;
var index = new Index();
index.init();
exports.default = index.router;

'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var postsRouter_1 = require("./postsRouter");
//TODO. Routers not ready yet
//import authRouter from './authRouter';
//import repliesRouter from './repliesRouter';
//import userRouter from './userRouter';
//import categoriesRouter from './categoriesRouter';
// class to route all the REST-api paths
var Index = /** @class */ (function () {
    function Index() {
        this.router = express_1.Router();
        this.init();
    }
    // Root path response
    Index.prototype.rootPath = function (req, res, next) {
        res.send({ message: 'Server is up and running' });
    };
    // Catching api-calls with bad address
    Index.prototype.notFound = function (req, res, next) {
        res.status(404).send({ message: 'Path not found' });
    };
    //Routing all the addresses to right path
    Index.prototype.init = function () {
        this.router.get('/', this.rootPath);
        this.router.use('/api/v1/posts', postsRouter_1.default);
        // this.router.use('/api/v1/categories', categoriesRouter);
        // this.router.use('/api/v1/replies', repliesRouter);
        // this.router.use('/api/v1/auth', authRouter);
        // this.router.use('/api/v1/users', usersRouter);
        this.router.all('*', this.notFound);
    };
    return Index;
}());
exports.Index = Index;
var index = new Index();
index.init();
exports.default = index.router;
//# sourceMappingURL=index.js.map
'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
//import PostsRouter from './routes/postsRouter';
var index_1 = __importDefault(require("./routes/index"));
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('', index_1.default);
app.listen(3000);
console.log("Server running on: http://localhost:" + 3000 + "/");

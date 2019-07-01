'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var index_1 = require("./routes/index");
var Posts_1 = require("./orm/entities/Posts");
var Categories_1 = require("./orm/entities/Categories");
var Users_1 = require("./orm/entities/Users");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
typeorm_1.createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "newuser",
    password: "password",
    database: "bulletinboard2",
    entities: [
        Posts_1.Posts, Users_1.Users, Categories_1.Categories
    ],
    synchronize: true,
    logging: false
}).then(function (connection) {
    connection.getRepository(Posts_1.Posts);
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/', index_1.default);
    app.listen(3000);
}).catch(function (error) { return console.log(error); });
console.log("Server running on: http://localhost:" + 3000 + "/");
//# sourceMappingURL=app.js.map
'use strict'
import {createConnection} from "typeorm";
import Index from './routes/index';
import {Posts} from "./orm/entities/Posts";
import { Categories } from "./orm/entities/Categories";
import { Users } from "./orm/entities/Users";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "newuser",
    password: "password",
    database: "bulletinboard2",
    entities: [
        Posts, Users, Categories
    ],
    synchronize: true,
    logging: false}).then(connection => {
    connection.getRepository(Posts);
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/', Index);

    app.listen(3000);
}).catch(error => console.log(error));
console.log("Server running on: http://localhost:" + 3000 + "/");
'use strict'
import {createConnection} from "typeorm";
import Index from './routes/index';
import {Posts} from "./orm/Posts";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

createConnection().then(connection => {
    
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/', Index);

    app.listen(3000);
}).catch(error => console.log(error));
console.log("Server running on: http://localhost:" + 3000 + "/");
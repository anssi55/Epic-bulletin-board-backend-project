'use strict'
import {createConnection, getConnection} from "typeorm";
import Index from './routes/index';
import express = require("express");
import * as bodyParser from "body-parser";
import cors = require('cors');


export class App {
    public app: express.Application;
    

    constructor() {
        this.app = express();
        this.middleware();
    }
    //Adding middleware to app
    private middleware(): void {
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }
    //Making connection to database
    private makeConnection():void {
        createConnection().then(async connection => {
                this.app.use('/', Index.router);
                this.app.listen(3000);
                console.log("Server running on: http://localhost:" + 3000 + "/");
        }).catch(error => console.log(error));
    }

    

    init() {
        this.makeConnection();
    }

}
const app = new App();
app.init();




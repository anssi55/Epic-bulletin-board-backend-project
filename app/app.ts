'use strict'
import {createConnection, getConnection} from "typeorm";
import Index from './routes/index';
import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
const awilix = require('awilix')
import { Posts } from "./orm/entities/Posts";
import { Categories } from "./orm/entities/Categories";
import { Users } from "./orm/entities/Users";

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
  })

class App {
    public app: express.Application;
    public connection;

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
        this.connection = createConnection({
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
            logging: false}).then(async connection => {
               
                this.app.use('/', Index);
                this.app.listen(3000);
                console.log("Server running on: http://localhost:" + 3000 + "/");
        }).catch(error => console.log(error));
    }

    

    //Close connection
    public closeConnection():void {
        this.connection.close();
    }

    init() {
        this.makeConnection();
    }

}
const app = new App();
app.init();

container.register({
    db: awilix.asClass(app).classic(),
    connectionString: awilix.asValue(process.env.CONN_STR),
    timeout: awilix.asValue(1000)
})

export default new App().app;
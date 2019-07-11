import { Index } from './routes/index';
import express = require('express');
import * as bodyParser from 'body-parser';
import cors = require('cors');

export class App {
  public app: express.Application;
  private index: Index;
  constructor(opts) {
    this.index = opts.index;

    this.app = express();
  }
  //Adding middleware to app
  private middleware(): void {
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }
  private routes(): void {
    this.index.init();
    this.app.use('/', this.index.router);
  }

  private startServer(): void {
    this.app.listen(3000, function() {
      console.log('Server running on: http://localhost:' + 3000 + '/');
    });
  }

  init() {
    this.middleware();
    this.routes();
    this.startServer();
  }
}

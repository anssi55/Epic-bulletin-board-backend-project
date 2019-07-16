import express = require('express');
import * as bodyParser from 'body-parser';
const cors = require('cors');

import Index from './routes/Index';
import { Dependencies } from './Types';
import errorMiddleware from './middleware/error.middleware';

class App {
  public app: express.Application;
  private index: Index;
  constructor(opts: Dependencies) {
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
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private startServer(): void {
    this.app.listen(3000, function() {
      console.log('Server running on: http://localhost:' + 3000 + '/');
    });
  }

  init() {
    this.middleware();
    this.routes();
    this.initializeErrorHandling();
    this.startServer();
  }
}
export default App;

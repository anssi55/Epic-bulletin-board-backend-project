'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var index_1 = require("./routes/index");
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
typeorm_1.createConnection().then(function (connection) {
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/', index_1.default);
    app.listen(3000);
}).catch(function (error) { return console.log(error); });
console.log("Server running on: http://localhost:" + 3000 + "/");
//# sourceMappingURL=app.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
var express = require("express");
// Create a new express application instance
var app = express();
app.get('/post', function (req, res) {
    res.send('Hello World!');
});
app.post('/', function (req, res) {
    var s = req.body;
    res.send("Hello " + s);
});
app.put('/', function (req, res) {
    var p = req.body;
    res.send("hello");
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

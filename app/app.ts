// lib/app.ts
import express = require('express');

// Create a new express application instance
const app: express.Application = express();

app.get('/post', function (req, res) {
  res.send('Hello World!');
});

app.post('/', function (req, res) {
    let s: String = req.body;
    res.send("Hello " + s);
});
app.put('/', function (req, res) {
    let p: String = req.body;
    res.send("hello");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
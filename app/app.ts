'use strict'

import Index from './routes/index';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('', Index);

app.listen(3000);
console.log("Server running on: http://localhost:" + 3000 + "/");
require('dotenv-safe').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));

app.use('/',express.static('./dist'));

app.listen(process.env.PORT);
console.log(`listening at ${process.env.PORT}`);
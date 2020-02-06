require('dotenv-safe').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const app = express();

app.use(cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 14, //2 weeks expiry day,
    keys: process.env.SESSION_KEY
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));

app.use('/',express.static('./dist'));

app.listen(process.env.PORT);
console.log(`listening at ${process.env.PORT}`);
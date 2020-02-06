require('dotenv-safe').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const app = express();

const DEFAULT_API_ROUTE = "/api/v1";
const bitlyRoute = require('./server/bitlyAPI');

//TODO: logging using Winston
//TODO: server API testing using Mocha 

app.use(cookieSession({
    maxAge: 1000 * 60 * 60 * 24 * 14, //2 weeks expiry day,
    keys: process.env.SESSION_KEY
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));

app.use(`${DEFAULT_API_ROUTE}/bitly/`, bitlyRoute.router);
app.use('/',express.static('./dist'));

//handle all error
app.use((error,req,res,next) => {
    console.logs(error);
    res
    .status(500)
    .json({
        data:{
            description:`Something went wrong :/`,
            hint:`TODO`
        }
    })
})

app.listen(process.env.PORT);
console.log(`listening at ${process.env.PORT}`);
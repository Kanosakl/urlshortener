require('dotenv-safe').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const DEFAULT_API_ROUTE = "/api/v1";
const urlShortenerRoute = require('./server/shortenerAPI');

//TODO: logging using Winston
//TODO: server API testing using Mocha 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false}));

app.use(`${DEFAULT_API_ROUTE}/`, urlShortenerRoute.router);
app.use('/',express.static('./dist'));

//handle all error
app.use((error,req,res,next) => {
    console.log(error);
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
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');

let server = null;

async function start(api,repository){

    const app = express();
    app.use(morgan('dev'));

    app.use((err, req, res, next) => {


        console.log(err);
        res.sendStatus(500);
    })


    api(app,repository);

    server = app.listen(8080);

    return server;

}

module.exports = start;

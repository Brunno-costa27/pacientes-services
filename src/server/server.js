const cors = require('cors');
const bodyParser = require("body-parser");
const passport = require('passport');
const cookieSession = require('cookie-session');
require('../../passport-setup');
require('express-async-errors');
const express = require('express');
const morgan = require('morgan');

let server = null;

async function start(api, repository) {

    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(morgan('dev'));

    // Para um aplicativo real, você deve configurar isso com um tempo de expiração, melhores chaves, proxy e seguro
    app.use(cookieSession({
        name: 'tuto-session',
        keys: ['key1', 'key2']
    }))

    // Inicializa as sessões de passaporte e passaporte
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((err, req, res, next) => {


        console.log(err);
        res.sendStatus(500);
    })


    api(app, repository);

    server = app.listen(8081, () => {
        console.log("rodando!");
    });

    return server;

}

module.exports = { start };

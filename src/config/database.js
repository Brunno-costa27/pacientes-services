const pgp = require('pg-promise')();


const paciente = pgp({

    user: "postgres",
    host: "127.0.0.1",
    database: "pacientes",
    password: "cursodeti27!",
    port: 5432
   
})

module.exports = paciente;

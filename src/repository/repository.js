const db = require('../config/database')

async function pegarTodos(){

    try {
        
     await db.connect();
     const result =  await db.query("SELECT * FROM pacientes");
     console.log('deu certo!')
     console.log(result);


    } catch (error) {
        
        console.log("deu errado!");
    }

}

pegarTodos();
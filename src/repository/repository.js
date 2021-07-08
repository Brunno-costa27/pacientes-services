const db = require('../config/database')

async function pegarTodosPacientes(){

    try {
        
     await db.connect();
     const result =  await db.query("SELECT * FROM pacientes");
     console.log('Todos os pacientes');
     return result;

    } catch (error) {
        
        console.log("deu errado!");
    }

}

async function obterPacienteId(id){

    try {
        
     await db.connect();
     const result =  await db.query("SELECT * FROM pacientes");// falta mudar a query
     console.log('Todos os pacientes pelo id');
     return result;

    } catch (error) {
        
        console.log("deu errado!");
    }

}

async function deletarPaciente(id){

    try {
        
     await db.connect();
     const result =  await db.query("SELECT * FROM pacientes");// falta mudar a query
     console.log('Todos os pacientes pelo id');
     return result;

    } catch (error) {
        
        console.log("deu errado!");
    }

}

module.exports = { pegarTodosPacientes,obterPacienteId,deletarPaciente }
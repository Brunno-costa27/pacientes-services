const db = require('../config/database')

async function pegarTodosPacientes(){

    try {
        
     await db.connect();
     const result =  await db.query("SELECT * FROM pacientes");
     console.log('Todos os pacientes');
     return result;

    } catch (error) {
        
        console.log("deu errado na função pegar todos!");
    }

}

async function obterPacienteId(id){

    try {
        
     await db.connect();
     const result =  await db.query("SELECT * FROM pacientes");// falta mudar a query
     console.log('Todos os pacientes pelo id');
     return result;

    } catch (error) {
        
        console.log("deu errado na obeter id!");
    }

}

async function deletarPaciente(id){

    try {
        
     await db.connect();
     const result =  await db.query("SELECT * FROM pacientes");// falta mudar a query
     console.log('Todos os pacientes pelo id');
     return result;

    } catch (error) {
        
        console.log("deu errado na função deletar!");
    }

}

module.exports = { pegarTodosPacientes,obterPacienteId,deletarPaciente }
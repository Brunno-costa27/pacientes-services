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

    const id1 = id;    
    console.log(id1);
    try {
     await db.connect();
     const result =  await db.query(`SELECT * FROM pacientes WHERE id = ${id1}`);// falta mudar a query
     console.log('Todos os pacientes pelo id');

     return result;

    } catch (error) {
        
        console.log("deu errado ao obter id!");
    }

}

async function deletarPaciente(id){

    try {
     const id1 = id; 
     await db.connect();
     const result =  await db.query("SELECT * FROM pacientes id = `${id1}`");// falta mudar a query
     console.log('Todos os pacientes pelo id');
     return result;

    } catch (error) {
        
        console.log("deu errado na função deletar!");
    }

}

module.exports = { pegarTodosPacientes,obterPacienteId,deletarPaciente }
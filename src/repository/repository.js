const db = require('../config/database')

async function pegarTodosPacientes(){

    try {   
     await db.connect();
     const result =  await db.query("SELECT * FROM login");
     return result;

    } catch (error) {
        console.log("deu errado na função pegar todos!");
    }

}

async function pegarTodasRequisicoes(id){

    try { 
     
     await db.connect();
     const result =  await db.query(`select * from cadastro where id_login = ${id}`);
     return result;

    } catch (error) {
        
        console.log("deu errado na função pegar todos os mendicamentos!");
    }

}

async function obterPacienteId(id){

    const id1 = id;    
    try {
     await db.connect();
     const result =  await db.query(`SELECT * FROM login WHERE id = ${id1}`);
     return result;

    } catch (error) {
        
        console.log("deu errado ao obter id!");
    }

}

async function deletarPaciente(id){

    const id2 = id; 
    try {
     await db.connect();
     const result =  await db.query(`DELETE  FROM login WHERE id = ${id2}`);
     return result;

    } catch (error) {
        
        console.log("deu errado na função deletar!");
    }
}

async function cadastrarPacientes(id,nome,cidade,senha){


    try {
        await db.connect();
        const result =  await db.query(`insert into login values(${id},'${nome}','${cidade}','${senha}')`);
        return result;
        
    } catch (error) {
       
        console.log("deu errado ao cadastrar pacientes!");
    }

}

module.exports = { pegarTodosPacientes,obterPacienteId,deletarPaciente,cadastrarPacientes,pegarTodasRequisicoes}
const db = require('../config/database')

async function pegarTodosPacientes(){

    try {
        
     await db.connect();
     const result =  await db.query("SELECT * FROM login");
     console.log('Todos os pacientes');
     return result;

    } catch (error) {
        
        console.log("deu errado na função pegar todos!");
    }

}

async function pegarTodasRequisicoes(){

    try {
        
     await db.connect();
     const result =  await db.query(`select login.nome,cadastro.medicamento from login INNER JOIN cadastro ON cadastro.id_login = login.id`);
     console.log('lista de medicamentos');
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
     console.log('Todos os pacientes pelo id');

     return result;

    } catch (error) {
        
        console.log("deu errado ao obter id!");
    }

}

async function deletarPaciente(id){

    const id2 = id; 
    console.log(id2);
    try {
     await db.connect();
     const result =  await db.query(`DELETE  FROM login WHERE id = ${id2}`);
     console.log('Todos os pacientes pelo id');
     return result;

    } catch (error) {
        
        console.log("deu errado na função deletar!");
    }
}

async function cadastrarPacientes(id,nome,cidade,senha){


    try {
        await db.connect();
        const result =  await db.query(`insert into login values(${id},'${nome}','${cidade}','${senha}')`);
        console.log('Cadastrando pacientes!');
        return result;
        
    } catch (error) {
       
        console.log("deu errado ao cadastrar pacientes!");
    }

}

module.exports = { pegarTodosPacientes,obterPacienteId,deletarPaciente,cadastrarPacientes,pegarTodasRequisicoes}
(async () => {

    const db = require('./config/database');
    const paciente = require("./api/pacientes");
    const server = require("./server/server");
    const repository = require("./repository/repository");

    try {
        await server.start(paciente, repository);
        console.log("Deu certo!");
    } catch (error) {
        console.log("Deu errado aqui!");
        
    }
})();
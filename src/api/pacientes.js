module.exports = (app,repository) => {

    app.post('/pacientes', async (req, res) => {

        
        const {id,nome,cidade,senha} = req.body;
       
        try {
            const paciente = await repository.cadastrarPacientes(id,nome,cidade,senha); 
            res.status(201).json(paciente);
        } catch (error) {
            res.status(401).json({message: "erro ao cadastrar paciente"});
        }
       
    });
    
    app.get('/pacientes', async (req, res) => {

     try {
         const paciente = await repository.pegarTodosPacientes(); 
         res.json(paciente);
     } catch (error) {
         res.status(400).send();
     }   
        
    });

    app.get('/pacientes/:id', async (req, res) => {

        const uuid = req.params.id;
        try {
            const id = await repository.obterPacienteId(uuid);
            res.json(id);
        } catch (error) {
            res.status(400).send();
        }
    });


    app.delete('/pacientes/:id', async (req, res) => {

        const uuid = req.params.id;
        try {
            const id = await repository.deletarPaciente(uuid);
            res.json(id);
        } catch (error) {
            res.status(400).send();            
        }
    });

    app.get('/requisicoes/:id', async (req, res) => {
        const id = req.params.id;
        try {
            const paciente = await repository.pegarTodasRequisicoes(id); 
            res.json(paciente);
        } catch (error) {
            res.status(400).send();
        }
        
    });

}
module.exports = (app,repository) => {

    app.post('/pacientes', async (req, res) => {

        
        const {id,nome,idade,endereco} = req.body;
       
            const paciente = await repository.cadastrarPacientes(id,nome,idade,endereco); // tratar com try catch
       
        res.status(201).json(paciente);
    });
    
    app.get('/pacientes', async (req, res) => {

        
        const paciente = await repository.pegarTodosPacientes(); // tratar com try catch
        
        res.json(paciente);
    });

    app.get('/pacientes/:id', async (req, res) => {

        const uuid = req.params.id;
        const id = await repository.obterPacienteId(uuid);// tratar com try catch
        res.json(id);
    });


    app.delete('/pacientes/:id', async (req, res) => {

        const uuid = req.params.id;
        const id = await repository.deletarPaciente(uuid);// tratar com try catch
        console.log(id);
        res.json(id);
    });

}
module.exports = (app,repository) => {

    app.get('/pacientes', async (req, res) => {

        const paciente = await repository.pegarTodosPacientes(); // tratar com try catch
        
        console.log(paciente);
        res.json(paciente);
    });

    app.get('/pacientes/:id', async (req, res) => {

        const uuid = req.params.id;
        const id = await repository.obterPacienteId(uuid);// tratar com try catch
        console.log(id);
        res.json(id);
    });


    app.delete('/pacientes/:id', async (req, res) => {

        const uuid = req.params.id;
        const id = await repository.deletarPaciente(uuid);// tratar com try catch
        console.log(id);
        res.json(id);
    });

}
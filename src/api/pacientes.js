module.exports = (app,repository) => {

    app.get('/pacientes', async (req, res) => {

        const paciente = await repository.pegarTodosPacientes();
        
        console.log(paciente);
        res.json(paciente);
    });

    app.get('/pacientes/:id', async (req, res) => {

        const uuid = req.params.id;
        const id = await repository.obterPacienteId(uuid);
        // console.log(uuid);
        console.log(id);
        res.json(id);
    });

}
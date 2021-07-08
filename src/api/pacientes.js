module.exports = (app,repository) => {

    app.get('/pacientes', async (req, res) => {

        const paciente = await repository.pegarTodosPacientes();
        console.log(paciente);
        res.json(paciente);
    });

}
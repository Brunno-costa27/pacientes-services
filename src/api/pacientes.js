
module.exports = (app, repository) => {

    app.post('/pacientes', async (req, res) => {

        const pacienteExiste = await repository.pegarTodosPacientes();

        const { nome, cidade, senha } = req.body;
        console.log(nome, cidade, senha);

        const alreadyExists = pacienteExiste.some((user) => user.nome === nome);

        if (alreadyExists) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        try {
            const paciente = await repository.cadastrarPacientes(nome, cidade, senha);
            res.status(201).json({ paciente });
        } catch (error) {
            res.status(401).json({ message: "erro ao cadastrar paciente" });
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

    app.put('/pacientes/:id', async (req, res) => {
        const id = req.params.id;
        const { nome } = req.body;
        try {
            const paciente = await repository.atualizarPaciente(id, nome);
            res.json(paciente);
        } catch (error) {
            res.status(400).send();
        }
    });

    app.post('/autenticacao', async (req, res) => {

        const pacienteExiste = await repository.pegarTodosPacientes();

        const { nome, senha } = req.body;

        const pacienteAlreadyExists = pacienteExiste.find((user) => user.nome === nome && user.senha === senha);
        if(pacienteAlreadyExists){
            res.status(200).json(pacienteAlreadyExists);
        }else{
            res.status(400).json({message: "paciente não existe!"});
        }

    });

}
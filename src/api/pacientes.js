const passport = require('passport');
const { ensureAuth, ensureGuest } = require('../middleware/auth')
module.exports = (app, repository) => {

    app.post('/pacientes', async (req, res) => {

        const pacienteExiste = await repository.pegarTodosPacientes();

        const { id, nome, email } = req.body;
        console.log(nome, id, email);

        const alreadyExists = pacienteExiste.some((user) => user.email === email);

        if (alreadyExists) {
            return res.status(400).json({ error: 'Paciente já existe!' });
        }else{

            try {
                const paciente = await repository.cadastrarPacientes(id,nome,email);
                res.status(201).json({message: 'Paciente cadastrado com sucesso!'});
            } catch (error) {
                res.status(401).json({ message: "erro ao cadastrar paciente" });
            }
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

      // Middleware de autenticação que verifica se o usuário está logado
      const isLoggedIn = (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.sendStatus(401);
        }
    }

    // // Exemplo de rotas protegidas e desprotegidas
    app.get('/', ensureGuest,(req, res) => res.send('Examplo de página inicial!'))
    app.get('/failed', (req, res) => res.send('Você falhou ao entrar!'))
    app.get('/login', ensureAuth,(req, res) => {

        // res.send('Examplo de página inicial!');
        console.log(req.user);
    })


    // // Nesta rota você pode ver que se o usuário estiver logado, você pode acessar suas informações em: req.user
    app.get('/good', isLoggedIn, async (req, res) => {

        res.send(`Bem vindo ${req.user.id}!`);
    })
        

    // // Rotas de autenticação
    app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
         function(req, res) {
            // Autenticação bem-sucedida, redirecionar para casa.
            res.redirect('/good');
        }
    );

    app.get('/logout', (req, res) => {
        req.session = null;
        req.logout();
        res.redirect('/');
    })

}
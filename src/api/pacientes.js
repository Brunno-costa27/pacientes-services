const passport = require('passport');
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const axios = require('axios');
module.exports = (app, repository) => {

    // cadastrar pacientes
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

    app.post('/requisicao', async (req, res) => {

        const pacienteExiste = await repository.pegarTodosPacientes();
        const {id_cadastro, medicamento, medico, quantidade, id_login, create_date } = req.body;
        console.log(id_cadastro,medicamento, medico, quantidade,id_login, create_date);
        const pacienteEncontrado = pacienteExiste.some(user => user.id === id_login.toString());
        
        if (!pacienteEncontrado) {
            return res.status(400).json({ error: 'Paciente não existe!' });
        }else{

            try {
                const paciente = await repository.cadastrarRequisicao( medicamento, medico, quantidade, id_login, create_date );
                res.status(201).json({message: 'Paciente cadastrado com sucesso!'});
            } catch (error) {
                res.status(401).json({ message: "erro ao cadastrar paciente" });
            }
        }
    });

    // essa rota será a que vem a resposta do portal farmacia e mostrará as requisições para cada clinte de acordo com o id que vier na rota
    app.get('/teste/:id', async (req, res) => {

        const id = req.params.id;
        const converte = parseInt(id);
        try {
            //Response é a resposta do axios , mas eu tiro o data de dentro do response com a desestruturação
            const { data } = await axios('http://portalfarmacia.brazilsouth.cloudapp.azure.com:3333/historicoDePreco');
            const nomeExiste = data.filter(x => x.id_historico);
            const filtrar = nomeExiste.filter(x => x.id_historico == converte)
            console.log(filtrar);
            return res.json(filtrar);
            
        } catch (error) {
            console.log('Errou!');
        }

    });   

    // pegar todos os pacientes
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

    // deletar o paciente pelo id
    app.delete('/pacientes/:id', async (req, res) => {

        const uuid = req.params.id;
        try {
            const id = await repository.deletarPaciente(uuid);
            res.json(id);
        } catch (error) {
            res.status(400).send();
        }
    });

    // pegar todas as requesiçoes pelo id
    app.get('/requisicoes/:id', async (req, res) => {
        const id_log = req.params.id;
        const paciente = await repository.todasRequisicoes();

        
        const pacienteAlredyExist = paciente.some(id => id.id_login === id_log);
        if(!pacienteAlredyExist){
            res.status(400).json({error: 'paciente não existe'});
        }else{

            try {
                const paciente = await repository.pegarTodasRequisicoes(id_log);
                res.json(paciente);
            } catch (error) {
                res.status(400).send();
            }
        }


    });

    // pegar todas as requisicoes do sistema
    app.get('/requisicoes', async (req, res) => {
        try {
            const paciente = await repository.todasRequisicoes();
            res.status(201).json(paciente);
        } catch (error) {
            res.status(400).send();
        }

    });

    // atualizar pacientes
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
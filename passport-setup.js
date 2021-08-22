const passport = require('passport');
const repository = require("./src/repository/repository");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function (user, done) {
  /*
  Do usuário pega apenas o id (para minimizar o tamanho do cookie) e passa apenas o id do usuário
  para o retorno de chamada feito
  PS: Você não tem que fazer assim, geralmente é feito assim
  */
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  /*
  Em vez do usuário, esta função geralmente recebe o id
  então você usa o id para selecionar o usuário do banco de dados e passar o usuário obj para o retorno de chamada concluído
  PS: Você pode acessar posteriormente esses dados em qualquer rota em: req.user
  */
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: "475579261358-lat87ltq31k4ng5803ohc41s8fjnljdv.apps.googleusercontent.com",
  clientSecret: "321ejTnYRGLOGvp5-RGsKODR",
  callbackURL: "http://localhost:3333/google/callback"
},
  async function (accessToken, refreshToken, profile, done) {
    /*
    use as informações do perfil (principalmente o id do perfil) para verificar se o usuário está registrado em seu banco de dados
    Se sim, selecione o usuário e passe-o para o callback concluído
    Se não, crie o usuário, selecione-o e passe para o callback
    */

   try {
      const pacienteExiste = await repository.pegarTodosPacientes();
      let id = profile.id;
  
      const alreadyExists = pacienteExiste.some((user) => user.id === id);
  
      if (alreadyExists) {
        done(null,profile);
        console.log("existe");
      }else{
        let id = profile.id;
        let nome = profile.displayName;
        let email = profile.emails[0].value;
        const paciente = await repository.cadastrarPacientes(id, nome, email);
        console.log("não existe");
        done(null, profile);
      }
    
    } catch (error) {
      console.error(error);
    }
    return done(null, profile); 
  }

));

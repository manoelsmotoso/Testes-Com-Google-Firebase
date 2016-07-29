var usuario = function() {

    this.criarUsuario = function(email, senha, nome) {
        firebase.auth()
            .createUserWithEmailAndPassword(email, senha)
            .then(function(result) {
                alerta.innerHTML = "Usuario criado com sucesso";
                console.log("Usuario criado com sucesso. Uid =  ", result.uid);
                cadastrarUsuario(result.uid, nome, email, senha);
            })
            .catch(function(error) {
                alerta.innerHTML = error.message;
                console.log("Falha ao criar usuario: ", error.message);
                // ...
            });


    }
    this.cadastrarUsuario = function(uid, nome, email, senha) {
        firebase.database().ref('usuarios/' + uid).set({
                nome: nome,
                email: email,
                senha: md5(senha)
            })
            .then(function(result) {
                alerta.innerHTML = 'Usuario cadastrado com sucesso';
                console.log('Usuario cadastrado com sucesso');
                fazerUploadDeFoto(uid, getFotoParaUpload());
            });
    }

}

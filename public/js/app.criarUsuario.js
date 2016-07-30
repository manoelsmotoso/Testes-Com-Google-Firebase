function criarConta() {
    firebase.auth().createUserWithEmailAndPassword(email.value, senha.value)
        .then(function(result) {
            alerta.innerHTML = 'Usuario criado com sucesso';
            console.log('Usuario criado com sucesso. Uid =  ', result.uid);
            sessionStorage.setItem('email', email.value);
            sessionStorage.setItem('senha', senha.value);
            sessionStorage.setItem('uid', result.uid);
            gravarUsuario(result.uid, email.value, senha.value);
        })
        .catch(function(error) {
            alerta.innerHTML = error.message;
            console.log('Falha ao criar usuario: ', error.message);
            // ...
        });
}

function gravarUsuario(uid, email, senha) {
    firebase.database().ref('usuarios/' + uid).set({
        email: email,
        hashSenha: md5(senha)
    }).then(function(result) {
        alerta.innerHTML = 'Pre cadastro concluido clique em proceguir para concluir';
        console.log('Pre cadastro concluido.');
        window.location.replace("/cadastro.html");

    });
}

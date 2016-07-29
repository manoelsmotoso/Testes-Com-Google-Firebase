buttonLogin.addEventListener('click',fazerLogin,false);
function fazerLogin() {
    firebase
        .auth()
        .signInWithEmailAndPassword(email.value, senha.value)
        .then(function(result) {
            alerta.innerHTML = result.uid;
            console.log("Usuario Logado com sucesso. Uid =  ", result.uid);
            window.location.replace('cadastro.html?uid='+result.uid);
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alerta.innerHTML = errorMessage;
            console.log("Flaha no login! Codigo:", errorCode);
            console.log("Detalhes: ", errorMessage);
            // ...
        });

}
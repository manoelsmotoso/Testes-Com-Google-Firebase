 if (sessionStorage.getItem('uid') != null || sessionStorage.getItem('uid') != '') {
     email.value = sessionStorage.getItem('email');
	 senha.value = sessionStorage.getItem('senha');
	 login(sessionStorage.getItem('email'), sessionStorage.getItem('senha'));
 }

function fazerLogin() {
    login(email.value, senha.value);
    
}

function login(email, senha) {
    firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(function(result) {
            console.log("Usuario Logado com sucesso. Uid =  ", result.uid);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('senha', senha);
            sessionStorage.setItem('uid', result.uid);
            window.location.replace('/home.html');
            
        })
        .catch(function(error) {
            // Handle Errors here.
            alerta.innerHTML = error.message;
            console.log("Flaha no login! Codigo:", error.code);
            console.log("Detalhes: ", error.message);
            // ...
        });
}

function loginComProvedor(provedor) {
    var alerta = document.getElementById('alerta');
    var provider = '';
    if(provedor === 'Facebook'){
     provider = new firebase.auth.FacebookAuthProvider();
	}
	if(provedor === 'Google'){
	 provider = new firebase.auth.GoogleAuthProvider();
	}
	if(provedor === 'GitHub'){
	 provider = new firebase.auth.GithubAuthProvider();
	}
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        alerta.innerHTML = user;
        console.log("Toquen: "+token);
        console.log("User: "+user.displayName);
        console.log("Uid: "+user.uid);
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alerta.innerHTML = errorMessage;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log("Codigo do erro: "+errorCode);
        console.log("Mensagem de erro: "+errorMessage);
        console.log("Email: "+email);
        console.log("Credencial: "+credential);


        // ...
    });
}

 if (sessionStorage.getItem('uid') == null || sessionStorage.getItem('uid') == '') {
     window.location.replace('/index.html');
 }

 if (firebase.auth().currentUser == null) {
     login(sessionStorage.getItem('email'), sessionStorage.getItem('senha'));
 }else{
 	 getDadosDeUsuario(firebase.auth().currentUser);
 }

 function login(email, senha) {
     firebase.auth().signInWithEmailAndPassword(email, senha)
         .then(function(result) {
             alerta.innerHTML = "Dados recuperados com sucesso";
             console.log("Usuario Logado com sucesso. Uid =  ", result.uid);
             sessionStorage.setItem('email', email);
             sessionStorage.setItem('senha', senha);
             sessionStorage.setItem('uid', result.uid);
             getDadosDeUsuario(firebase.auth().currentUser);
         })
         .catch(function(error) {
             // Handle Errors here.
             alerta.innerHTML = error.message;
             console.log("Flaha no login! Codigo:", error.code);
             console.log("Detalhes: ", error.message);
             // ...
         });
 }

 function getDadosDeUsuario(user) {
     if (user != null) {
         console.log(user);
         nome.innerHTML = user.displayName;
         email.innerHTML = user.email;
         fotoDoPerfil.src = user.photoURL;
		 firebase.database().ref('/usuarios/' + user.uid).once('value')
		 .then(function(snapshot) {
            console.log(snapshot.val());
            celular.innerHTML = snapshot.val().celular;
            telefone.innerHTML = snapshot.val().telefone;
       });
     }
 }

 function atualizarDadosDeUsuario() {
     window.location.replace('/cadastro.html');
 }

function deletarFotoDoPerfil() {
    // Create a reference to the file to delete
    var desertRef = storageRef.child('usuarios/' + sessionStorage.getItem('uid') + '/perfil');
    // Delete the file
    desertRef.delete().then(function() {
        // File deleted successfully
        console.log('Foto do perfil deletada com sucesso.');
        fotoDoPerfil.src = '';
    }).catch(function(error) {
        // Uh-oh, an error occurred!
        console.log('Ocorreu um errro inesperado: Descrição: ' + error);

    });
}

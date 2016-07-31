if (sessionStorage.getItem('uid') == null || sessionStorage.getItem('uid') == '') {
    window.location.replace('/index.html');
}

if (firebase.auth().currentUser == null) {
    login(sessionStorage.getItem('email'), sessionStorage.getItem('senha'));
} else {
    getDadosDeUsuario(firebase.auth().currentUser);
}
nome.addEventListener('keyup',function (){navbarTitle.innerHTML=nome.value;},false);
file.addEventListener('change', function (e) {fazerUploadDeFoto(sessionStorage.getItem('uid'), e.target.files[0]);}, false);

function login(emailAuth, senhaAuth) {
    firebase.auth().signInWithEmailAndPassword(emailAuth, senhaAuth)
        .then(function(result) {
            console.log("Usuario Logado com sucesso. Uid =  ", result.uid);
            sessionStorage.setItem('email', emailAuth);
            sessionStorage.setItem('senha', senhaAuth);
            sessionStorage.setItem('uid', result.uid);
            email.value = result.email;
            nome.value = result.displayName;
            imgGravada.src = result.photoURL;
            sessionStorage.setItem('isAutenticado', true);
            getDadosDeUsuario(result);
        }).catch(function(error) {
            // Handle Errors here.
            alerta.innerHTML = error.message;
            console.log("Flaha no login! Codigo:", error.code);
            console.log("Detalhes: ", error.message);
            sessionStorage.setItem('isAutenticado', false);
            // ...
        });
}

function getDadosDeUsuario(user) {
    if (user != null) {
        nome.value = user.displayName;
		navbarTitle.innerHTML = user.displayName;
        email.value = user.email;
        imgGravada.src = user.photoURL;
        firebase.database().ref('/usuarios/' + user.uid).once('value').then(function(snapshot) {
            console.log(snapshot.val());
            celular.value = snapshot.val().celular;
            telefone.value = snapshot.val().telefone;
            // ...
        });
    }
}

function atualizarDadosDeUsuario() {
    firebase.auth().currentUser.updateProfile({
        displayName: nome.value,
        photoURL: imgGravada.src
    }).then(function() {
        // Update successful.
        alerta.innerHTML = "Dados atualizados com sucesso";
        console.log("Dados atualizados com sucesso");
    }, function(error) {
        // An error happened.
        alerta.innerHTML = "Erro ao atualizar dados.";
        console.log("Erro ao atualizar dado do usuario: " + error);
    });
}

//--------------------------------------------------------------------//

function concluirCadastro() {
    firebase.database().ref('usuarios/' + sessionStorage.getItem('uid')).update({
        nome: nome.value,
        telefone: telefone.value,
        celular: celular.value
    }).then(function(result) {
        alerta.innerHTML = 'Cadastro concluido';
        atualizarDadosDeUsuario();
        console.log('Cadastro concluido.');
        window.location.replace('/home.html');

    });
}

function gravarUrlDaFoto(uid, downloadURL) {
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates['/usuarios/' + uid + '/foto'] = downloadURL;

    return firebase.database().ref().update(updates).then(function(result) {
            alerta.innerHTML = 'Upload de imagem concluida';
            console.log('Url de foto do usuario foi gravada com sucesso: ' + JSON.stringify(result));
            imgGravada.src = downloadURL;
            firebase.auth().currentUser.photoURL = downloadURL;

        });
}


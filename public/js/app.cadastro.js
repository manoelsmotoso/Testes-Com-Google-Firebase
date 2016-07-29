function getUid( name, url ) {
      if (!url) url = location.href;
      name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
      var regexS = "[\\?&]"+name+"=([^&#]*)";
      var regex = new RegExp( regexS );
      var results = regex.exec( url );
      return results == null ? null : results[1];
    }
    
file.addEventListener('change', setFotoParaUpload, false);

function setFotoParaUpload(e) {
    fazerUploadDeFoto(getUid('uid', window.location.href), e.target.files[0]);
}

function concluirCadastro() {
    firebase.database().ref('usuarios/' + getUid('uid', window.location.href)).update({
        nome: nome.value,
        telefone: telefone.value,
        celular: celular.value
    }).then(function(result) {
        alerta.innerHTML = 'Cadastro concluido';
        console.log('Cadastro concluido.');
    });
}

function gravarUrlDaFoto(uid, downloadURL) {
        // Write the new post's data simultaneously in the posts list and the user's post list.
        var updates = {};
        updates['/usuarios/' + getUid('uid', window.location.href) + '/foto'] = downloadURL;

        return firebase.database().ref().update(updates)
            .then(function(result) {
                alerta.innerHTML = 'Upload de imagem concluida';
                console.log('Url de foto do usuario foi gravada com sucesso: ' + JSON.stringify(result));
                imgGravada.src=downloadURL;
            });
    }

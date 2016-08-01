 if (!sessionStorage.getItem('uid')) {
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

             switch (error.code) {
                 case 'auth/invalid-email':
                     alerta.innerHTML = 'Email invalido ou em branco.';
                     console.log('Email invalido ou em branco.');
                     break;
                 case 'auth/wrong-password':
                     alerta.innerHTML = 'Email ou senha incorretos';
                     console.log('Senha incorreta');
                     break;
                case 'auth/user-not-found':
                     alerta.innerHTML = 'Email não cadastrado';
                     console.log('Email não cadastrado');
                     break;
             }

             //alerta.innerHTML = error.message;
             console.log("Flaha no login! Codigo:", error.code);
             // ...
         });
 }

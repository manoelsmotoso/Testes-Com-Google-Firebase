// Initialize Firebase
var config = {
    apiKey: "AIzaSyCHHK2m5yGFgdBQ4SI0zdu0oEidABa91mM",
    authDomain: "manoel.firebaseapp.com",
    databaseURL: "https://manoel.firebaseio.com",
    storageBucket: "firebase-manoel.appspot.com",
};
firebase.initializeApp(config);
console.log("(Firebase) - Cofigurado ");

var database = firebase.database();
console.log("(Firebase.database) - Referenciado ");

var storageRef = firebase.storage().ref();
console.log("(Firebase.storange) - Referenciado ");

function sair() {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('Usuario deslogado com sucesso.');
		sessionStorage.setItem('email', '');
        sessionStorage.setItem('senha', '');
        sessionStorage.setItem('uid','');
		window.location.replace('/index.html');
           
    }, function(error) {
        // An error happened.
        console.log('Erro ao tentar deslogar: '+error);
        
    });
}




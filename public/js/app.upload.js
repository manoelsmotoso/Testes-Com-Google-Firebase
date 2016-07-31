function fazerUploadDeFoto(uid, foto) {
    console.log("Arquivo para upload: " + foto.name);

    // Create the file metadata
    var metadata = {
        contentType: foto.type
    };
    console.log("Metadata: " + JSON.stringify(metadata));

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child('usuarios/' + uid + '/' + "perfil").put(foto, metadata);
    console.log("Chamou o uploadTask");

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progressUpload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Progresso de envio do arquivo - ' + foto.name + ' ' + progressUpload + '% ');

            progressInfo.innerHTML = Math.round(progressUpload)+"%";
            progress.value = progressUpload;

            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    alerta.innerHTML = 'Upload pausado';
                    console.log('Upload pausado');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    alerta.innerHTML = 'Fazendo upload';
                    console.log('Fazendo upload');
                    break;
            }
        },
        function(error) {
            alerta.innerHTML = error.code;
            console.log(error.code);
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;



                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        },
        function() {
            // Upload completed successfully, now we can get the download URL
            downloadURL = uploadTask.snapshot.downloadURL;
            gravarUrlDaFoto(uid, downloadURL)
            imgGravada.src = downloadURL;
            console.log('Dawnload diponivel em: ' + downloadURL);
        });
}

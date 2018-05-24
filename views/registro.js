const ipcRenderer = require('electron').ipcRenderer;

function registrar(event){
    console.log('Registrando');

    event.preventDefault();
    
    let email = document.getElementById('email').value;
    let user = document.getElementById('user').value;
    let pass = document.getElementById('pass').value;
    let passConf = document.getElementById('passConf').value;

    ipcRenderer.send('registro-submission', email, user, pass, passConf)
}

function loguear(event){
    console.log('Logueo exitoso');
    event.preventDefault();
    let user = document.getElementById('user').value;
    let pass = document.getElementById('pass').value;
   

    ipcRenderer.send('login-submission', user, pass)
}


const paragraph = document.getElementById('response');

ipcRenderer.on('error-message', function(event, message){
    paragraph.innerHTML = message;
})

ipcRenderer.on('logueo-exitoso', function(event, vista){
    window.location.replace(vista);
})
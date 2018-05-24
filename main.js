const {app, BrowserWindow,ipcMain} = require ('electron')
const path = require ('path')
const url= require ('url')

let win

function createWindow(){
    win = new BrowserWindow({width: 800, height:600})

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes:true
    }))

    win.webContents.openDevTools();

    win.on('closed', ()=>{
        win = null
    })

    app.on('window-all-closed', ()=>{
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })
}
app.on('ready',createWindow)

var request = require('request');

ipcMain.on('registro-submission', function(event,email,user,pass,passConf){
    if (email === '' || user === '' || pass === '' || passConf === ''){
        event.sender.send('error-message', 'Complete los campos');
    } else if (pass != passConf){
        event.sender.send('error-message', 'las contraseñas no coinciden')
    } else {
        request.post(
            'https://dojo-electron.herokuapp.com/registro',
            {json:{correo: email,usuario:user, password: pass}},
            function (error, response, body){
                if (error){
                    console.log('error');
                    event.sender.send('error-message', 'Error en el servidor');
                } else {
                    event.sender.send('registro-exitoso', 'registro.html')
                }
            }
        )
    }
})


ipcMain.on('login-submission', function(event,user,pass){
    if (user === '' || pass === '' ){
        event.sender.send('error-message', 'Complete los campos');
    } else {
        request.post(
            'https://dojo-electron.herokuapp.com/login',
            {json:{usuario:user, password: pass}},
            function (error, response, body){
                if (error){
                    console.log('error');
                    event.sender.send('error-message', 'Error en el servidor');
                } else if(response) {
                    event.sender.send('logueo-exitoso', 'index.html')
                } else {
                    console.log('error');
                    event.sender.send('error-message', 'Usuario no existe');
                }
            }
        )
    }
})
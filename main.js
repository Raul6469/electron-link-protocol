const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const dialog = require('electron').dialog
const ipc = require('electron').ipcMain

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({title: 'Protocol Link' });

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// # Here is code from this pull request : https://github.com/electron/electron-api-demos/pull/275
// # This solves a problem where Windows was unable to launch the app from a web link
if (process.defaultApp) {
  // If we have the path to our app we set the protocol client to launch electron.exe with the path to our app
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('testlink', process.execPath, [path.resolve(process.argv[1])])
  }
} else {
  app.setAsDefaultProtocolClient('testlink')
}

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('ready', createWindow)

let myPath;

// # Here is what happens when the program is called by the protocol :
var shouldquit = app.makeSingleInstance(function (event, url) {
  var myUrl = event[2]; //Here is contained the URL that triggered the app

  console.log(myUrl);

  mainWindow.webContents.send('info', myUrl)

})

if (shouldquit) {
  app.quit()
}
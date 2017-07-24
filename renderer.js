// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const shell = require('electron').shell
const path = require('path')
const os = require('os')
const remote = require('electron').remote;
const ipc = require('electron').ipcRenderer;

ipc.on('info', function (event, arg) {
  var myPath = arg;
  console.log(myPath);
})
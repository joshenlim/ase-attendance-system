'use strict'

import {
  app,
  protocol,
  BrowserWindow ,
  ipcMain
} from 'electron'

import {
  createProtocol,
  installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let workerWin

// check if the "App" protocol has already been created
let createdAppProtocol = false;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true,
    corsEnabled: true,
    supportFetchAPI: true
  }
}])

function createWindow () {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    // fullscreen: true,
    // frame: false,
    // autoHideMenuBar: true,
    // kiosk: true,
    webPreferences: {
      nodeIntegration: true,
      backgroundThrottling: false
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // Uncomment below to open dev tools for debugging
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    app.quit();
  })
}

function createWorker(devPath, prodPath) {
  console.log("Creating Worker...")

  workerWin = new BrowserWindow({
    show: false, // Change to this true to debug detector
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if(process.env.WEBPACK_DEV_SERVER_URL) {
    workerWin.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath);
    if (!process.env.IS_TEST) workerWin.webContents.openDevTools()
  } else {
    workerWin.loadURL(`app://./${prodPath}`)
  }

  workerWin.on('closed', () => { workerWin = null; });
}

function sendWindowMessage(targetWindow, message, payload) {
  if(typeof targetWindow === 'undefined') {
    console.log('Target window does not exist');
    return;
  }
  targetWindow.webContents.send(message, payload);
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
      // Install Vue Devtools
      try {
      await installVueDevtools()
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }

  if(!createdAppProtocol) {
    createProtocol('app');
    createdAppProtocol = true;
  }

  createWindow()
  // Disable this while working on frontend only
  createWorker('worker', 'worker.html');

  ipcMain.on('window-message-from-worker', (event, arg) => { 
    sendWindowMessage(win, 'message-from-worker', arg);
  });
  
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

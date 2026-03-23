const { app, BrowserWindow, ipcMain, shell } = require('electron')
const path = require('path')

let mainWindow

ipcMain.handle('open-mail', (event, email) => {
  shell.openExternal(`mailto:${email}`)
})

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (process.env.ELECTRON_DEV) {
    mainWindow.loadURL('http://localhost:4200')
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'))
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

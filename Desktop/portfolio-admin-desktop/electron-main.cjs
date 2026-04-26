const { app, BrowserWindow, ipcMain, shell, safeStorage } = require('electron')
const path = require('path')
const fs = require('fs')

let mainWindow
let authStoragePath

function ensureAuthStoragePath() {
  if (!authStoragePath) {
    authStoragePath = path.join(app.getPath('userData'), 'auth-user.json')
  }

  return authStoragePath
}

function writeAuthUser(payload) {
  const filePath = ensureAuthStoragePath()
  const serialized = JSON.stringify(payload)

  if (safeStorage.isEncryptionAvailable()) {
    const encrypted = safeStorage.encryptString(serialized)
    fs.writeFileSync(
      filePath,
      JSON.stringify({
        encrypted: encrypted.toString('base64'),
      }),
      'utf8',
    )
    return
  }

  fs.writeFileSync(
    filePath,
    JSON.stringify({
      plain: payload,
    }),
    'utf8',
  )
}

function readAuthUser() {
  const filePath = ensureAuthStoragePath()

  if (!fs.existsSync(filePath)) {
    return null
  }

  try {
    const raw = fs.readFileSync(filePath, 'utf8')
    const parsed = JSON.parse(raw)

    if (typeof parsed?.encrypted === 'string') {
      const decrypted = safeStorage.decryptString(
        Buffer.from(parsed.encrypted, 'base64'),
      )
      return JSON.parse(decrypted)
    }

    return parsed?.plain ?? null
  } catch {
    return null
  }
}

function clearAuthUser() {
  const filePath = ensureAuthStoragePath()

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

ipcMain.handle('open-mail', (event, email) => {
  shell.openExternal(`mailto:${email}`)
})
ipcMain.handle('auth-storage:get-user', () => readAuthUser())
ipcMain.handle('auth-storage:set-user', (_event, user) => {
  writeAuthUser(user)
  return true
})
ipcMain.handle('auth-storage:clear-user', () => {
  clearAuthUser()
  return true
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

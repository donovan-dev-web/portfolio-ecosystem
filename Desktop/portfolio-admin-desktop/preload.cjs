const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
  openMail: (email) => ipcRenderer.invoke('open-mail', email),
  authStorage: {
    getUser: () => ipcRenderer.invoke('auth-storage:get-user'),
    setUser: (user) => ipcRenderer.invoke('auth-storage:set-user', user),
    clearUser: () => ipcRenderer.invoke('auth-storage:clear-user'),
  },
})

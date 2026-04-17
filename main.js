const { app, BrowserWindow, Menu, shell } = require('electron')


//janela principal do aplicativo
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: './src/public/img/Pou_3D_icon.png',
    resizable: false,

  })
  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))

  win.loadFile('./src/views/index.html')
}

//janela sobre
const aboutWindow = () => {
  const aboutWin = new BrowserWindow({
    width: 400,
    height: 300,
    icon: './src/public/img/Pou_3D_icon.png',
    resizable: false,
    title: 'Sobre'
  })

  aboutWin.loadFile('./src/views/sobre.html')
}

app.whenReady().then(() => {
    
    createWindow()
    //aboutWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

//template do menu
const menuTemplate = [
    { label: 'Arquivo',
      submenu: [
        { label: 'Novo' },
        { label: 'Abrir' },
        { label: 'Salvar' },
        {type: 'separator'},
        { label: 'Sair', click: () => app.quit(), accelerator: 'alt+F4' }
      ]
    },
    {
        label: 'Exibir',
        submenu: [
            { label: 'Tela Cheia', click: (menuItem, browserWindow) => {
                if (browserWindow) {
                    browserWindow.setFullScreen(!browserWindow.isFullScreen())
                }
            }},
            {label: 'Recarregar', click: (menuItem, browserWindow) => {
                if (browserWindow) {
                    browserWindow.reload()
                }
            }}
        ]
    },
    {
        label: 'Ajuda',
        submenu: [
            { label: 'Documentação' , click: () => shell.openExternal('https://www.electronjs.org/docs')    },
            { label: 'Sobre', click: () => aboutWindow() }
        ]
    }
]
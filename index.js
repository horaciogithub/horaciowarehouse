const { app, BrowserWindow, screen } = require("electron");

function createWindow() {

  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  // Crea la ventana del navegador.
  let win = new BrowserWindow({ width, height });
  win.setMenu(null);

  // y carga el  index.html de la aplicación.
  win.loadURL("http://localhost:3000");
}

app.on("ready", createWindow);

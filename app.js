const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const xlsx = require('xlsx');

let win;

app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  win.loadFile('./src/index.html');
  win.webContents.openDevTools();
})


ipcMain.on('send-path', (event, path) => {

  const data = {
    title: "Path",
    body: path
  }

  const wb = xlsx.readFile(path);

  let sheet1 = wb.Sheets['sheet1'];
  sheet1 = xlsx.utils.sheet_to_json(sheet1);
  console.log(sheet1);
  // new Notification(data).show();

  win.webContents.send('send-data', sheet1);
})




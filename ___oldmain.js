const {app, BrowserWindow, ipcMain} = require('electron');
const url = require('url');
const path = require('path');
const SwissQRBill = require("swissqrbill");
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

function onReady() {
  win = new BrowserWindow({
    show: false,
    title: 'SGSI - Fatture QR',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  win.loadURL(url.format({
    pathname: path.join(
      __dirname,
      'dist/sgsi-qr-bill/index.html'),
    protocol: 'file:',
    slashes: true
  }))
  win.webContents.openDevTools();

  win.maximize();

  win.once('ready-to-show', () => win.show())

  win.on('closed', function () {
    win = null
  })
}

app.on('ready', onReady);

ipcMain.on('ready', (event, arg) => {


  db.serialize(() => {
    db.run("CREATE TABLE lorem (info TEXT)");

    const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (let i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
      console.log(row.id + ": " + row.info);
    });
  });

  db.close();

  const data = {
    currency: "CHF",
    amount: 1199.95,
    creditor: {
      name: "Robert Schneider AG",
      address: "Rue du Lac 1268",
      zip: 2501,
      city: "Biel",
      account: "CH5800791123000889012",
      country: "CH"
    },
    debtor: {
      name: "Pia-Maria Rutschmann-Schnyder",
      address: "Grosse Marktgasse 28",
      zip: 9400,
      city: "Rorschach",
      country: "CH"
    }
  };

  const pdf = new SwissQRBill.PDF(data, "qrbill.pdf", {"language": "IT"}, () => {
    console.log("PDF has been successfully created.");
  });
  initApp().then(() => event.sender.send('ready'));
});

async function initApp() {
  return true;
}

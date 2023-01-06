"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const fs = require("fs");
const DatabaseManager_1 = require("./DatabaseManager");
const PdfGenerator_1 = require("./PdfGenerator");
const dbManager = new DatabaseManager_1.DatabaseManager("test.db");
let win = null;
const args = process.argv.slice(1), serve = args.some(val => val === '--serve');
const fp = require("find-free-port");
fp(3000).then((freePort) => {
    console.log('found ' + freePort);
}).catch((err) => {
    console.error(err);
});
function createWindow() {
    const size = electron_1.screen.getPrimaryDisplay().workAreaSize;
    // Create the browser window.
    win = new electron_1.BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: (serve),
            contextIsolation: false, // false if you want to run e2e test with Spectron
        },
    });
    if (serve) {
        const debug = require('electron-debug');
        debug();
        require('electron-reloader')(module);
        win.loadURL('http://localhost:4200');
    }
    else {
        // Path when running electron executable
        let pathIndex = './index.html';
        if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
            // Path when running electron in local folder
            pathIndex = '../dist/index.html';
        }
        const url = new URL(path.join('file:', __dirname, pathIndex));
        win.loadURL(url.href);
    }
    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store window
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
    return win;
}
try {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
    electron_1.app.on('ready', () => setTimeout(createWindow, 400));
    // Quit when all windows are closed.
    electron_1.app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            electron_1.app.quit();
        }
    });
    electron_1.app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });
}
catch (e) {
    // Catch Error
    // throw e;
}
electron_1.ipcMain.on('init-rest-api', (event, arg) => {
    fp(30000000000).then((freePort) => {
        console.log('found free port' + freePort[0]);
        event.sender.send('init-rest-api', freePort[0]);
    }).catch((err) => {
        console.error(err);
        event.sender.send('init-rest-api-error', err);
    });
});
electron_1.ipcMain.on('ready', (event, arg) => __awaiter(void 0, void 0, void 0, function* () {
    yield dbManager.initialize();
    const invoice = {
        title: "Tassa sociale 2023",
        salutation: "Mendrisio, 3 gennaio 2023",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl. Suspendisse rhoncus nisl posuere tortor tempus et dapibus elit porta. Cras leo neque, elementum a rhoncus ut, vestibulum non nibh. Phasellus pretium justo turpis. Etiam vulputate, odio vitae tincidunt ultricies, eros odio dapibus nisi, ut tincidunt lacus arcu eu elit. Aenean velit erat, vehicula eget lacinia ut, dignissim non tellus. Aliquam nec lacus mi, sed vestibulum nunc. Suspendisse potenti. Curabitur vitae sem turpis. Vestibulum sed neque eget dolor dapibus porttitor at sit amet sem. Fusce a turpis lorem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;",
        signatures: [{
                position: "CEO",
                firstName: "Pinco",
                lastName: "Pallino"
            }],
        currency: "CHF",
        message: "abc",
        language: "IT",
        creditor: {
            organizationId: 1,
            name: "Società",
            ibanAccount: "CH94082520243206C000C",
            address: {
                street: "Via S. Gottardo",
                buildingNumber: "13a",
                zip: "6900",
                city: "Lugano",
                country: "CH"
            },
            email: "email.address@gmail.com",
            website: {
                label: "website",
                url: "www.google.com"
            },
            // logoUrl: {
            //   label: "logo",
            //   url: "./logo2.png"
            // }
        },
        debtor: {
            clientId: 1,
            organizationId: 1,
            title: "Sig.",
            firstName: "Pia-Maria",
            lastName: "Rutschmann-Schnyder",
            address: {
                street: "Grosse Marktgasse",
                buildingNumber: "28",
                zip: "9400",
                city: "Rorschach",
                country: "CH"
            }
        },
        status: 'OPEN'
    };
    new PdfGenerator_1.PdfGenerator().generate(invoice, "qrbill.pdf");
    initApp().then(() => event.sender.send('ready'));
}));
function initApp() {
    return __awaiter(this, void 0, void 0, function* () {
        return true;
    });
}
//# sourceMappingURL=main.js.map
import {app, BrowserWindow } from 'electron';
import path from 'path';

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        // width: 800,
        // height: 600,
        // webPreferences: {
        //     nodeIntegration: true,
        //     contextIsolation: false,
        //     enableRemoteModule: true
        // }
    });
    mainWindow.loadURL(path.join(app.getAppPath(), '/dist-react/index.html'));
    // mainWindow.loadURL("http://localhost:3000");
    // mainWindow.webContents.openDevTools();
    mainWindow.on("closed", () => {
        app.quit();
    });
    mainWindow.on("close", (event) => {
        event.preventDefault();
        mainWindow.hide();
    });
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            mainWindow.show();
        }
    });
    app.on("before-quit", () => {
        mainWindow.destroy();
    });
    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {
            app.quit();
        }
    });
    app.on("will-quit", () => {
        mainWindow.destroy();
    });
    app.on("quit", () => {
        mainWindow.destroy();
    });
    app.on("browser-window-focus", () => {
        mainWindow.show();
    });
    app.on("browser-window-blur", () => {
        mainWindow.hide();
    });

})
import {app, BrowserWindow } from 'electron';
import path from 'path';
import { isDev } from './util.js';

type test = string;

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          devTools: true, // This should be true or omitted (true by default)
        }
    });
    if (isDev()){
      mainWindow.loadURL('http://localhost:5123');
      // This is the URL for the Vite dev server
      // The dev server is started by running the `devScript` script in package.json
    } else {
      mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }
});
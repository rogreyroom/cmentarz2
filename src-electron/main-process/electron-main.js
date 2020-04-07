/* eslint-disable no-undef */
import { app, BrowserWindow } from 'electron';
const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const expressApp = express();
const router = express.Router();

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
	global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\');
}

let mainWindow;

function createWindow() {
	/**
   * Initial window options
   */
	mainWindow = new BrowserWindow({
		width: 1366,
		height: 768,
		useContentSize: true,
		webPreferences: {
			// keep in sync with /quasar.conf.js > electron > nodeIntegration
			// (where its default value is "true")
			// More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
			nodeIntegration: true,
			webSecurity: true
		}
	});

	mainWindow.loadURL(process.env.APP_URL);

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});

expressApp.use(cors());

router.get('/file/:name', function(req, res) {
	const imagesFolder = path.join(app.getPath('documents'), './cmentarz/db/images/');
	const filename = path.join(imagesFolder, req.params.name);
	// eslint-disable-next-line no-console
	console.log('Serving file:', filename);
	res.sendFile(filename);
});

expressApp.use('/', router);

http.createServer(expressApp).listen(8000);

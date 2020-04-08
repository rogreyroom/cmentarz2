/* eslint-disable no-console */
/* eslint-disable no-undef */
import { app, BrowserWindow } from 'electron';
const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const formidable = require('formidable');
const sharp = require('sharp');
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

router.get('/images/:name', function(req, res) {
	const folderName = path.join(app.getPath('documents'), '/cmentarz/db/images/');
	const filename = path.join(folderName, req.params.name);
	console.log('Serving file:', filename);
	res.sendFile(filename);
});

router.post('/images/upload/:name', function(req, res) {
	const form = new formidable.IncomingForm({ keepExtensions: true });
	const folder = path.join(app.getPath('documents'), '/cmentarz/db/test/');
	form.uploadDir = folder;

	form.on('file', (filename, file) => {
		file.name = req.params.name;
		fs.rename(file.path, `${form.uploadDir}/n_${file.name}`, err => {
			if (err) throw err;
			console.log(`Renamed: [ ${file.name} ]`);
		});

		sharp(`${form.uploadDir}/n_${file.name}`)
			.resize({ height: 400 })
			.toFile(`${form.uploadDir}/${file.name}`)
			.then(info => {
				fs.unlinkSync(`${form.uploadDir}/n_${file.name}`, err => {
					if (err) throw err;
				});
				console.log(`Resized: [ ${file.size} ] -> [ ${info.size} ]`);
			})
			.catch(err => console.log(err));
	});

	form.parse(req, (_, field, file) => {
		console.log('Received:', Object.keys(file));
		res.send('Thank you');
	});
});

expressApp.use('/', router);

http.createServer(expressApp).listen(8000);

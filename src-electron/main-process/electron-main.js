/* eslint-disable no-console */
/* eslint-disable no-undef */
import { app, BrowserWindow } from 'electron';
const fs = require('fs-extra');
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
	const folder = path.join(app.getPath('documents'), '/cmentarz/db/images/');
	form.uploadDir = folder;
	const graveFilename = req.params.name.split('.')[0].toString();

	form.parse(req, (_, field, file) => {
		console.log('Received:', Object.keys(file));
	});

	form.on('file', (filename, file) => {
		const uploadedFileExtension = filename.split('.').pop();
		const newFileName = `${graveFilename}.${uploadedFileExtension}`;

		return sharp(file.path)
			.resize({ height: 500 })
			.toFile(path.join(form.uploadDir, newFileName))
			.then(() => {
				fs.remove(file.path, err => console.log(`Removing uploaded file error: ${err}`));
				console.log(`Image processing is ready. New filename ${newFileName}`);
				res.status(200).send('Thank you');
			})
			.catch(err => {
				fs.remove(file.path, err => console.log(`Removing uploaded file error: ${err}`));
				console.error(`Error when processing the file: ${err}`);
				res
					.status(500)
					.send(
						"Nie udało się nadpisać istniejącego zdjęcia. Sprawdź czy istniejące zdjęcie nie zawiera atrybutu 'Tylko do odczytu'"
					);
			});
	});
});

expressApp.use('/', router);

http.createServer(expressApp).listen(8000);

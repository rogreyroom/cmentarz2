/* eslint-disable no-console */
/* eslint-disable no-undef */
import { app, BrowserWindow } from 'electron';
const fs = require('fs-extra');
const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const formidable = require('formidable');
const Jimp = require('jimp');
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
		width: 1360,
		height: 760,
		useContentSize: true,
		webPreferences: {
			// keep in sync with /quasar.conf.js > electron > nodeIntegration
			// (where its default value is "true")
			// More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
			nodeIntegration: true,
			webSecurity: true
		}
	});

	mainWindow.removeMenu();
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
	if (!fs.existsSync(folder)) {
		fs.mkdirSync(folder);
	}
	form.uploadDir = folder;
	const graveFilename = req.params.name.split('.')[0].toString();

	form.parse(req, (_, field, file) => {
		console.log('Received:', Object.keys(file));
	});

	form.on('file', (filename, file) => {
		const uploadedFileExtension = filename.split('.').pop();
		const newFileName = `${graveFilename}.${uploadedFileExtension}`;

		return Jimp.read(file.path)
			.then(lenna => {
				return lenna
					// .resize(Jimp.AUTO, 500) // resize
					.quality(100) // set JPEG quality
					.write(path.join(form.uploadDir, newFileName)); // save
			})
			.then(() => {
				console.log(file.path);
				fs.remove(file.path, err => {
					if (err) console.log(`Removing uploaded file error: ${err}`);
				});
				console.log(`Image processing is ready. New filename ${newFileName}`);
				res.status(200).send('Thank you');
			})
			.catch(err => {
				fs.remove(file.path, err => {
					if (err) console.log(`Removing uploaded file error: ${err}`);
				});
				console.error(`Error when processing the file: ${err}`);
				res
					.status(500)
					.send(
						"Nie udało się nadpisać istniejącego zdjęcia. Sprawdź czy istniejące zdjęcie nie zawiera atrybutu 'Tylko do odczytu'"
					);
			});
	});
});

router.delete('/images/remove/:name', function(req, res) {
	const folderName = path.join(app.getPath('documents'), '/cmentarz/db/images/');
	fs.remove(path.join(folderName, req.params.name), err => {
		if (err) {
			console.log(`Removing uploaded file error: ${err}`);
			res.status(500).send('Nie udało się usunąć zdjęcia grobu!');
		}
		console.log(`Zdjęcie ${req.params.name} zostało usunięte!`);
		res.status(200).send('Usunięto zdjęcie');
	});
});

expressApp.use('/', router);

http.createServer(expressApp).listen(8000);

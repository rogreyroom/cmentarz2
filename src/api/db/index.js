/* eslint-disable no-console */
import Datastore from 'nedb-async';
import path from 'path';
import { remote } from 'electron';

const userDocumentsPath = remote.app.getPath('documents');
const userDbPath = '/cmentarz/db/';
const dbPath = `${userDocumentsPath}${userDbPath}`;

// DATABASE CONNECTION
const db = new Datastore({
	autoload: true,
	filename: path.join(dbPath, 'cm.db'),
	onload: function(err) {
		if (err) {
			console.error('Failed to load the datastore:', err);
		} else {
			console.log('Loaded the datastore!');
		}
	}
});

export default db;

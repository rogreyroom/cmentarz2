/* eslint-disable no-console */
import { db } from './';

export const GET_DB_DATA = async () => {
	const cemeteries = db.asyncFind({ doc: 'cm' }, (err, data) => {
		err ? console.error(err) : '';
		return data;
	});

	const graves = db.asyncFind({ doc: 'graves' }, (err, data) => {
		err ? console.error(err) : '';
		return data;
	});

	const users = db.asyncFind({ doc: 'users' }, (err, data) => {
		err ? console.error(err) : '';
		return data;
	});

	const takers = db.asyncFind({ doc: 'takers' }, (err, data) => {
		err ? console.error(err) : '';
		return data;
	});

	const results = await Promise.all([
		cemeteries,
		graves,
		users,
		takers
	]);
	return results;
};

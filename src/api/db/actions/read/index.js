/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { db } from '../../index';

function cemeteryCall() {
	return db.asyncFind({ doc: 'cm' }, (err, data) => {
		err ? console.error(err) : '';
		return data;
	});
}

function gravesCall() {
	return db.asyncFind({ doc: 'graves' }, (err, data) => {
		err ? console.error(err) : '';
		return data;
	});
}

function usersCall() {
	return db.asyncFind({ doc: 'users' }, (err, data) => {
		err ? console.error(err) : '';
		return data;
	});
}

function takersCall() {
	return db.asyncFind({ doc: 'takers' }, (err, data) => {
		err ? console.error(err) : '';
		return data;
	});
}

export const GET_DB_DATA = async () => {
	const cemeteries = cemeteryCall();
	const graves = gravesCall();
	const users = usersCall();
	const takers = takersCall();

	const results = await Promise.all([
		cemeteries,
		graves,
		users,
		takers
	]);
	return results;
};

export const GET_CEMETERY_DATA = async () => {
	const cemeteries = cemeteryCall();
	const result = await cemeteries;
	return result;
};

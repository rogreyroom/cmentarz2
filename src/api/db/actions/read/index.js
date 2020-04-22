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

export const GET_GRAVES_DATA = async () => {
	const graves = gravesCall();
	const result = await graves;
	return result;
};

export const GET_TAKERS_DATA = async () => {
	const takers = takersCall();
	const result = await takers;
	return result;
};

export const GET_USERS_DATA = async () => {
	const users = usersCall();
	const result = await users;
	return result;
};

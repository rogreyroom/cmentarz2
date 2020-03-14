/* eslint-disable no-console */
import { db } from '../../api';

const GET_DB_DATA = async () => {
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

export const FETCH_ALL = async ({ commit }) => {
	await GET_DB_DATA({ commit }).then(result => {
		const [
			cemeteries,
			graves,
			users,
			takers
		] = result;

		commit('SET_CEMETERIES', cemeteries);
		commit('SET_GRAVES', graves);
		commit('SET_USERS', users);
		commit('SET_TAKERS', takers);
		commit('SET_ALL', { graves, users, takers });
	});
};

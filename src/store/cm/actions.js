/* eslint-disable no-console */
import { date } from 'quasar';
import { read, add, update, del } from '../../api';
import { cmSchema, parcelaSchema, opiekunSchema, userSchema } from '../../api/db/schema/schema';
import { validateDataAgainstSchema } from '../../api/db/schema/validator';
const { GET_DB_DATA, GET_CEMETERY_DATA, GET_GRAVES_DATA, GET_TAKERS_DATA, GET_USERS_DATA } = read;
const { ADD_CEMETERY_DATA, ADD_GRAVE_DATA, ADD_TAKER_DATA, ADD_USER_DATA } = add;
const { UPDATE_CEMETERY_DATA, UPDATE_GRAVE_DATA, UPDATE_TAKER_DATA, UPDATE_USER_DATA } = update;
const { REMOVE_CEMETERY_DATA, REMOVE_GRAVE_DATA, REMOVE_USER_DATA } = del;

// HELPERS

const dateFormat = myDate => {
	return date.formatDate(myDate, 'YYYY-MM-DD');
};

// FETCH_ALL

export const FETCH_ALL = async ({ commit }) => {
	await GET_DB_DATA({ commit }).then(result => {
		const [
			cemeteries,
			graves,
			users,
			takers
		] = result;

		graves.map(({ parcela }) => {
			if (parcela.ext) {
				const fileName = `${parcela.nrGrobu.replace(/\|/gi, '-')}`;
				parcela.imgFileName = `${fileName}.${parcela.ext}`;
			}
			if (parcela.dtOplaty) parcela.dtOplaty = dateFormat(parcela.dtOplaty);
		});

		users.map(({ user }) => {
			if (user.dtUrodzenia) user.dtUrodzenia = dateFormat(user.dtUrodzenia);
			if (user.dtZgonu) user.dtZgonu = dateFormat(user.dtZgonu);
			if (user.dtPochowku) user.dtPochowku = dateFormat(user.dtPochowku);
		});

		commit('SET_CEMETERIES', cemeteries);
		commit('SET_GRAVES', graves);
		commit('SET_USERS', users);
		commit('SET_TAKERS', takers);
		commit('SET_ALL', { graves, users, takers });
	});
};

// CEMETERY ACTIONS

export const FETCH_CEMETERIES = async ({ commit }) => {
	await GET_CEMETERY_DATA({ commit }).then(result => {
		commit('SET_CEMETERIES', result);
	});
};

export const ADD_CEMETERY = async ({ dispatch }, cmData) => {
	const { value, error } = await validateDataAgainstSchema(cmData, cmSchema);

	if (error) throw error;
	await ADD_CEMETERY_DATA(value);
	await dispatch('FETCH_CEMETERIES');
};

export const UPDATE_CEMETERY = async ({ dispatch }, { id, cmData }) => {
	const { value, error } = await validateDataAgainstSchema(cmData, cmSchema);

	if (error) throw error;
	await UPDATE_CEMETERY_DATA(id, value);
	await dispatch('FETCH_CEMETERIES');
};

export const REMOVE_CEMETERY = async ({ dispatch }, id) => {
	await REMOVE_CEMETERY_DATA(id);
	await dispatch('FETCH_CEMETERIES');
};

// GRAVE ACTIONS

export const FETCH_GRAVES = async ({ commit }) => {
	await GET_GRAVES_DATA({ commit }).then(result => {
		commit('SET_GRAVES', result);
	});
};

export const ADD_GRAVE = async ({ dispatch }, graveData) => {
	const { value, error } = await validateDataAgainstSchema(graveData, parcelaSchema);

	if (error) throw error;
	await ADD_GRAVE_DATA(value);
	await dispatch('FETCH_GRAVES');
};

export const UPDATE_GRAVE = async ({ commit }, { id, graveData }) => {
	const { value, error } = await validateDataAgainstSchema(graveData, parcelaSchema);

	if (error) throw error;
	await UPDATE_GRAVE_DATA(id, value);
	if (value.dtOplaty) value.dtOplaty = dateFormat(value.dtOplaty);
	if (value.ext) {
		const fileName = `${value.nrGrobu.replace(/\|/gi, '-')}`;
		value.imgFileName = `${fileName}.${value.ext}`;
	}
	commit('SET_GRAVE', { id: id, value: value });
};

export const REMOVE_GRAVE = async ({ dispatch }, grave) => {
	await REMOVE_GRAVE_DATA(grave);
	await dispatch('FETCH_GRAVES');
};

// TAKER

export const FETCH_TAKERS = async ({ commit }) => {
	await GET_TAKERS_DATA({ commit }).then(result => {
		commit('SET_TAKERS', result);
	});
};

export const ADD_TAKER = async ({ dispatch }, takerData) => {
	const { value, error } = await validateDataAgainstSchema(takerData, opiekunSchema);

	if (error) throw error;
	await ADD_TAKER_DATA(value);
	await dispatch('FETCH_TAKERS');
};

export const UPDATE_TAKER = async ({ commit }, { id, takerData }) => {
	const { value, error } = await validateDataAgainstSchema(takerData, opiekunSchema);

	if (error) throw error;
	await UPDATE_TAKER_DATA(id, value);
	commit('SET_TAKER', { id: id, value: value });
};

// USER ACTIONS

export const FETCH_USERS = async ({ commit }) => {
	await GET_USERS_DATA({ commit }).then(result => {
		commit('SET_USERS', result);
	});
};

export const ADD_USER = async ({ dispatch }, userData) => {
	const { value, error } = await validateDataAgainstSchema(userData, userSchema);

	if (error) throw error;
	await ADD_USER_DATA(value);
	await dispatch('FETCH_USERS');
};

export const UPDATE_USER = async ({ commit }, { id, userData }) => {
	const { value, error } = await validateDataAgainstSchema(userData, userSchema);

	if (error) throw error;
	await UPDATE_USER_DATA(id, value);
	if (value.dtUrodzenia) value.dtUrodzenia = dateFormat(value.dtUrodzenia);
	if (value.dtZgonu) value.dtZgonu = dateFormat(value.dtZgonu);
	if (value.dtPochowku) value.dtPochowku = dateFormat(value.dtPochowku);
	commit('SET_USER', { id: id, value: value });
};

export const REMOVE_USER = async ({ dispatch }, id) => {
	await REMOVE_USER_DATA(id);
	await dispatch('FETCH_USERS');
};

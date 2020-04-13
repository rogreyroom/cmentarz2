/* eslint-disable no-console */
import { read, add, update, del } from '../../api';
import { cmSchema, parcelaSchema, opiekunSchema } from '../../api/db/schema/schema';
import { validateDataAgainstSchema } from '../../api/db/schema/validator';
const { GET_DB_DATA, GET_CEMETERY_DATA, GET_GRAVES_DATA, GET_TAKERS_DATA } = read;
const { ADD_CEMETERY_DATA, ADD_GRAVE_DATA, ADD_TAKER_DATA } = add;
const { UPDATE_CEMETERY_DATA } = update;
const { REMOVE_CEMETERY_DATA, REMOVE_GRAVE_DATA } = del;

export const FETCH_ALL = async ({ commit }) => {
	await GET_DB_DATA({ commit }).then(result => {
		const [
			cemeteries,
			graves,
			users,
			takers
		] = result;

		graves.map(({ parcela }) => {
			const fileName = `${parcela.nrGrobu.replace(/\|/gi, '-')}`;
			parcela.imgFileName = `${fileName}.${parcela.ext}`;
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

// USER ACTIONS

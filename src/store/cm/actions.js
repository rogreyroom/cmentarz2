/* eslint-disable no-console */
import { db } from '../../api';

// CEMETERIES
export async function FETCH_CEMETERIES({ commit }) {
	await db.find({ doc: 'cm' }, (err, data) => {
		err ? console.error(err) : '';
		commit('SET_CEMETERIES', data);
	});
}

// USERS
export async function FETCH_USERS({ commit }) {
	await db.find({ doc: 'users' }, (err, data) => {
		err ? console.error(err) : '';
		commit('SET_USERS', data);
	});
}

// GRAVES
export async function FETCH_GRAVES({ commit }) {
	await db.find({ doc: 'graves' }, (err, data) => {
		err ? console.error(err) : '';
		commit('SET_GRAVES', data);
	});
}

// TAKERS
export async function FETCH_TAKERS({ commit }) {
	await db.find({ doc: 'takers' }, (err, data) => {
		err ? console.error(err) : '';
		commit('SET_TAKERS', data);
	});
}

// STORE
export async function COMBINE_ALL({ commit, dispatch, state }) {
	if (state.graves.length === 0) {
		await dispatch('FETCH_GRAVES');
	}

	if (state.users.length === 0) {
		await dispatch('FETCH_USERS');
	}

	if (state.takers.length === 0) {
		await dispatch('FETCH_TAKERS');
	}
	console.log(`G: ${state.graves.length}, U: ${state.users.length}, T: ${state.takers.length}`);

	if (state.graves.length > 0 && state.users.length > 0 && state.takers.length > 0) {
		console.log('go');
		await commit('SET_ALL', { graves: state.graves, users: state.users, takers: state.takers });
	}
}

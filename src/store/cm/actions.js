import { read, add, update, del } from '../../api';
import { cmSchema } from '../../api/db/schema/schema';
import { validateDataAgainstSchema } from '../../api/db/schema/validator';
const { GET_DB_DATA, GET_CEMETERY_DATA } = read;
const { ADD_CEMETERY_DATA } = add;
const { UPDATE_CEMETERY_DATA } = update;
const { REMOVE_CEMETERY_DATA } = del;

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

export const FETCH_CEMETERIES = async ({ commit }) => {
	await GET_CEMETERY_DATA({ commit }).then(result => {
		commit('SET_CEMETERIES', result);
	});
};

export const ADD_CEMETERY = async ({ dispatch }, cmData) => {
	const { value, error } = await validateDataAgainstSchema(cmData, cmSchema);

	if (error) return { error };
	await ADD_CEMETERY_DATA(value);
	await dispatch('FETCH_CEMETERIES');
};

export const UPDATE_CEMETERY = async ({ dispatch }, { id, cmData }) => {
	const { value, error } = await validateDataAgainstSchema(cmData, cmSchema);

	if (error) return { error };
	await UPDATE_CEMETERY_DATA(id, value);
	await dispatch('FETCH_CEMETERIES');
};

export const REMOVE_CEMETERY = async ({ dispatch }, id) => {
	await REMOVE_CEMETERY_DATA(id);
	await dispatch('FETCH_CEMETERIES');
};

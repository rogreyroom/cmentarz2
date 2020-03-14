import { GET_DB_DATA } from '../../api/db-actions';

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

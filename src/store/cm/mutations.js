/* eslint-disable no-console */
export function SET_CEMETERIES(state, payload) {
	state.cemeteries = payload.sort((a, b) => {
		const { thecm: { cName: cmNameA } } = a;
		const { thecm: { cName: cmNameB } } = b;
		return cmNameA.substring(2) - cmNameB.substring(2);
	});
}

export function SET_USERS(state, payload) {
	state.users = payload;
}

export function SET_GRAVES(state, payload) {
	state.graves = payload;
}

export function SET_TAKERS(state, payload) {
	state.takers = payload;
}

export function SET_ALL(state, payload) {
	const combineAll = payload.graves.map(grave => {
		const graveUsers = payload.users.filter(user => user.user.nrGrobu === grave.parcela.nrGrobu);
		const graveTakers = payload.takers.filter(taker => taker.taker.nrGrobu === grave.parcela.nrGrobu);

		return (grave = { ...grave, graveUsers, graveTakers });
	});
	state.gravesDetails = combineAll;
}

export function SET_GRAVE(state, payload) {
	const { id, value } = payload;
	const graveFound = state.graves.find(({ _id }) => _id === id);
	graveFound.parcela = value;
}

export function SET_TAKER(state, payload) {
	const { id, value } = payload;
	const takerFound = state.takers.find(({ _id }) => _id === id);
	takerFound.taker = value;
}

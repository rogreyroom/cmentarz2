/* eslint-disable no-console */
export function SET_CEMETERIES(state, payload) {
	state.cemeteries = payload;
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
	const all = payload.graves.map((grave) => {
		let graveUsers = payload.users.filter((user) => user.user.nrGrobu === grave.parcela.nrGrobu);
		let graveTakers = payload.takers.filter((taker) => taker.taker.nrGrobu === grave.parcela.nrGrobu);

		return (grave = { ...grave, graveUsers, graveTakers });
	});
	state.all = all;
}

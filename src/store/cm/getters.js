export function someGetter(/* state */) {}

export function GET_UNPAID_GRAVES(state) {
	return state.graves.filter(grave => grave.parcela.status === 'Nie opłacony');
}

export function GET_GRAVE(state) {
	return graveID => {
		return state.graves.filter(grave => grave.parcela.nrGrobu === graveID);
	};
}

export function GET_GRAVE_TAKER(state) {
	return graveID => {
		return state.takers.filter(({ taker }) => taker.nrGrobu === graveID);
	};
}

export function GET_GRAVE_USERS(state) {
	return graveID => {
		return state.users.filter(({ user }) => user.nrGrobu === graveID);
	};
}

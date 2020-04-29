/* eslint-disable no-console */
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

export function GET_USERS_BY_NAME(state) {
	return text => {
		return state.users.filter(({ user }) => {
			if (user.hasOwnProperty('nazwisko')) {
				const { nazwisko } = user;
				const textToBeFound = new RegExp('^' + text, 'gi');
				return nazwisko.match(textToBeFound);
			}
		});
	};
}

export function GET_PARCELA(state) {
	return name => {
		return state.cemeteries.find(({ thecm: { cName } }) => cName === name);
	};
}

export function GET_CEMETERY_COUNT(state) {
	return state.cemeteries.filter(cm => cm).length;
}

export function GET_ALL_GRAVES_COUNT(state) {
	return cmName => {
		return state.graves.filter(({ parcela: { parcela } }) => parcela === cmName).length;
	};
}

export function GET_ALL_PAID_GRAVES_COUNT(state) {
	return cmName => {
		return state.graves.filter(({ parcela: { parcela, status } }) => parcela === cmName && status === 'Opłacony')
			.length;
	};
}

export function GET_ALL_UNPAID_GRAVES_COUNT(state) {
	return cmName => {
		return state.graves.filter(
			({ parcela: { parcela, status } }) => parcela === cmName && status === 'Nie opłacony'
		).length;
	};
}

export function GET_ALL_EMPTY_GRAVES_COUNT(state) {
	return cmName => {
		return state.graves.filter(({ parcela: { parcela, status } }) => parcela === cmName && status === 'Puste')
			.length;
	};
}

export function GET_UNIQUE_CEMETERY_ROWS(state) {
	return cmName => {
		const arrOfFoundCementeryGraves = state.graves.filter(({ parcela: { parcela } }) => parcela === cmName);
		return [
			...new Set(arrOfFoundCementeryGraves.map(({ parcela: { rzad } }) => rzad))
		].sort((a, b) => +a - +b);
	};
}

export function GET_CEMETERY_ROW_GRAVES(state) {
	return (cmName, cmRow) => {
		return state.graves
			.filter(({ parcela: { parcela, rzad } }) => parcela === cmName && rzad === cmRow)
			.sort((a, b) => {
				const { parcela: { grob: graveA } } = a;
				const { parcela: { grob: graveB } } = b;
				return graveA - graveB;
			});
	};
}

export function GET_YEAR_TO_SEARCH(state) {
	return state.yearToSearch;
}

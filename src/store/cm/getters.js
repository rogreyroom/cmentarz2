export function someGetter(/* state */) {}

export function GET_UNPAID_GRAVES(state) {
	return state.graves.filter((grave) => grave.parcela.status === 'Nie opłacony');
}

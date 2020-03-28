export const validateField = function(msg, msgType) {
	return this.$q.notify({
		message: msg,
		color: msgType === 'error' ? 'negative' : 'positive',
		position: 'center',
		icon: 'announcement',
		timeout: 2500
	});
};

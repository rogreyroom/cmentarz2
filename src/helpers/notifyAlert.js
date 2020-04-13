export const notifyAlert = function(msg, msgType, time) {
	return this.$q.notify({
		message: msg,
		color: msgType === 'error' ? 'negative' : 'positive',
		position: 'center',
		icon: 'announcement',
		timeout: time || 2500
	});
};

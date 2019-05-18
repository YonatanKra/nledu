const message = module.exports = {
	postMessage(store, props) {
		store.dispatch('POST_MESSAGE', props.data || props)
	},
	loadMessages(store, props) {
		store.dispatch('FETCH_MESSAGES', props.data || props)
	},
	markAsRead({
		dispatch
	}, id, props) {
		dispatch('MARK_AS_READ', id, props);
	},
	markAsDone({
		dispatch
	}, id, props) {
		dispatch('MARK_AS_DONE', id, props);
	},
};

const statuses = module.exports = {
	loadStatuses(store, props) {
		const normalizedProps = Object.assign({}, props.data || props);

		store.dispatch('SET_STATUSES', normalizedProps);
	}
};

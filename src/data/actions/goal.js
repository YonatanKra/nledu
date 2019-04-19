const goals = module.exports = {
	loadGoals(store, props) {
		store.dispatch('SET_GOALS', props.data || props)
	}
};

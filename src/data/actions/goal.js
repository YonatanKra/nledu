const goals = module.exports = {
	loadGoals(store, props) {
		store.dispatch('SET_GOALS', props.data || props)
	},
	createGoal(store, props) {
		store.dispatch('CREATE_GOAL', props.data || props)
	}
};

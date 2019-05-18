
const assignment = module.exports = {
	loadAssignment(store, props) {
		store.dispatch('SET_ASSIGNMENT', props.data || props)
	},
	createAssignment(store, props) {
		store.dispatch('CREATE_ASSIGNMENT', props.data || props)
	},
	updateAssignment({ dispatch }, id, props) {
		dispatch('UPDATE_ASSIGNMENT', id, props);
    },
    updateProgress({ dispatch }, id, props) {
		dispatch('UPDATE_PROGRESS', id, props);
	},
};

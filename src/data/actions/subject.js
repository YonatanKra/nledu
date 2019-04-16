
const subjects = module.exports = {
	loadSubjects(store, props) {
		store.dispatch('SET_SUBJECTS', props.data || props)
	}
};

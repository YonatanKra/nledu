
const lessons = module.exports = {
	loadLessons(store, props) {
		store.dispatch('SET_LESSONS', props.data || props)
	}
};

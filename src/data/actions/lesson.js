
const lessons = module.exports = {
	loadLessons(store, props) {
		store.dispatch('SET_LESSONS', props.data || props)
	},
	createLesson(store, props) {
		store.dispatch('CREATE_LESSON', props.data || props)
	},
	updateLesson({ dispatch }, id, props) {
		dispatch('UPDATE_LESSON', id, props);
	},
};

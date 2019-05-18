const lessonStore = module.exports = {
	state: {
		lessons: []
	},
	mutations: {
		SET_LESSONS(state, lessons) {
			state.lessons = lessons
		},
		CREATE_LESSON(state, props) {
			if (props && props.id) {
				state.lessons.push(props);
			}
		},
		UPDATE_LESSON(state, id, props) {
			let lesson = state.lessons.find(les => les.id === id);

			Object.assign(lesson, props);
			lesson.last_modified = new Date();
		},
	}
};

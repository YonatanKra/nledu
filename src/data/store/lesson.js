const lessonStore = module.exports ={
	state: {
		lessons: []
	},
	mutations: {
		SET_LESSONS (state, lessons) {
			state.lessons = lessons
		  }
	}
};
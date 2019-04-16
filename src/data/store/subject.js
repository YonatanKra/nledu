const subjectStore = module.exports ={
	state: {
		subjects: []
	},
	mutations: {
		SET_SUBJECTS (state, subjects) {
			state.subjects = subjects
		  }
	}
};
const actions = module.exports = {
	loadStudents(store, props) {
		store.dispatch('SET_STUDENTS', props.data || props)
	},
	createStudent(store, props) {
		store.dispatch('CREATE_STUDENT', props.data || props);
	},
	updateStudent(store, props){
		store.dispatch('UPDATE_STUDENT', props.data || props);		
	}
};

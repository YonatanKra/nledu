const uuid = require('tiny-uuid');

const studentStore = module.exports ={
	state: {
		students: []
	},
	mutations: {
		SET_STUDENTS (state, students) {
			state.students = students
		  },

		CREATE_STUDENT(state, props) {
			if(props && props.id){
				state.students.push(props);
			}
		}
	}
};

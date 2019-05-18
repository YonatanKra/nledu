const uuid = require('tiny-uuid');

const studentStore = module.exports = {
	state: {
		students: []
	},
	mutations: {
		SET_STUDENTS(state, students) {
			state.students = students
		},

		CREATE_STUDENT(state, props) {
			if (props && props.id) {
				state.students.push(props);
			}
		},
		UPDATE_STUDENT(state, props) {
			let student = state.students.find(std => std.id === props.id);

			Object.assign(student, props);
			student.last_modified = new Date();
		},

	}
};

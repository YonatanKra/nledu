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
			const student = Object.assign(
				{
					id: uuid(),
					lastUpdate: new Date()
				},
				props
			);

			state.students.push(student);
		}
	}
};

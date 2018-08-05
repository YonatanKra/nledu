const uuid = require('tiny-uuid');

const studentStore = module.exports ={
	state: {
		students: []
	},
	mutations: {
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

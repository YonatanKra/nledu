const assignmentStore = module.exports = {
	state: {
		assignments: []
	},
	mutations: {
		SET_ASSIGNMENT(state, assignments) {
			state.assignments = assignments
		},
		CREATE_ASSIGNMENT(state, props) {
			if (props && props.id) {

				state.assignments.push(props);
			}
		},
		UPDATE_ASSIGNMENT(state, id, props) {
			let assignment = state.assignments.find(assignment => assignment.id === id);

			Object.assign(assignment, props);
			
			assignment.end_date = new Date();
			assignment.last_update_date = new Date();

		},
	}
};

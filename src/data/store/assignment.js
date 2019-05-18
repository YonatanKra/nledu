const assignmentStore = module.exports = {
	state: {
		assignments: []
	},
	mutations: {
		SET_ASSIGNMENT(state, assignments) {
			state.assignments = assignments
		},
		CREATE_ASSIGNMENT(state, props) {
			debugger;
			if (props && props.id) {
				
				state.assignments.push(props);
			}
		}
	}
};

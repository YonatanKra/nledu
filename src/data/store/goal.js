const goalStore = module.exports ={
	state: {
		goals: []
	},
	mutations: {
		SET_GOALS (state, goals) {
			state.goals = goals
		  },
		  CREATE_GOAL(state, props) {
			if (props && props.id) {
				state.goals.push(props);
			}
		}
	}
};
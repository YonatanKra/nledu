const goalStore = module.exports ={
	state: {
		goals: []
	},
	mutations: {
		SET_GOALS (state, goals) {
			state.goals = goals
		  }
	}
};
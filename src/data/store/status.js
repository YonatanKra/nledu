const statusStore = module.exports ={
	state: {
		statuses: []
	},
	mutations: {
		SET_STATUSES (state, statuses) {
			state.statuses = statuses
		  }
	}
};

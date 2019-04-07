const roleStore = module.exports ={
	state: {
		roles: []
	},
	mutations: {
		SET_ROLES (state, roles) {
			state.roles = roles
		  }
	}
};

const {get} = require('../local-storage/auth')

const authStore = module.exports ={
	state: {
		currentUser: get()
	},
	mutations: {
		SET_CURRENT_USER (state, user) {
			state.currentUser = user
		  }
	}
};
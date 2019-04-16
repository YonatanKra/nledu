const cityStore = module.exports ={
	state: {
		cities: []
	},
	mutations: {
		SET_CITIES (state, cities) {
			state.cities = cities
		  }
	}
};
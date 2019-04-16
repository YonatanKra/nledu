
const cities = module.exports = {
	loadCities(store, props) {
		store.dispatch('SET_CITIES', props.data || props)
	}
};
let { loadCities} = require('../actions/city');
const israelCities = require('../static-data/israel-cities.json')

const city = module.exports = {
	load(store) {
		const cities = israelCities.map(city => {
			return {
				name: city.name
			}
		})

		loadCities(store, cities);
	}
};

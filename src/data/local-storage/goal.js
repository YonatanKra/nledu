let { loadGoals } = require('../actions/goal');
const axios = require('axios');

const goal = module.exports = {
	load(store) {
		axios
		.get('http://localhost:5000/none-linear-education/us-central1/getGoals')
		.then(r => r.data)
		.then(goals => {
			loadGoals(store, goals);
		})
	}
};

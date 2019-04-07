let { loadStatuses } = require('../actions/status');
const axios = require('axios');

const status = module.exports = {
	load(store) {
		axios
		.get('http://localhost:5000/none-linear-education/us-central1/getStatuses')
		.then(r => r.data)
		.then(status => {
			loadStatuses(store, status);
		})
	}
};

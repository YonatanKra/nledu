let { loadStatuses } = require('../actions/status');
const axios = require('axios');
const statusPath = require('../../common/servicePathes').status;

const status = module.exports = {
	load(store) {
		axios
		.get(statusPath.getStatuses)
		.then(r => r.data)
		.then(status => {
			loadStatuses(store, status);
		})
	}
};

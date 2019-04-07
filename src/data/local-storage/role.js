let { loadRoles } = require('../actions/role');
const axios = require('axios');

const role = module.exports = {
	load(store) {
		axios
		.get('http://localhost:5000/none-linear-education/us-central1/getRoles')
		.then(r => r.data)
		.then(roles => {
			loadRoles(store, roles);
		})
	}
};

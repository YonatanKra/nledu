let { loadRoles } = require('../actions/role');
const axios = require('axios');
const rolePath = require('../../common/servicePathes').role;

const role = module.exports = {
	async load(store) {
		const res = await axios.get(rolePath.getRoles);
		const data = await res.data;

		loadRoles(store, data);
	}
};

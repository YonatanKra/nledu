let { loadSubjects } = require('../actions/subject');
const axios = require('axios');

const role = module.exports = {
	load(store) {
		axios
		.get('http://localhost:5000/none-linear-education/us-central1/getSubjects')
		.then(r => r.data)
		.then(subjects => {
			loadSubjects(store, subjects);
		})
	}
};

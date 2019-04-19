let { loadLessons } = require('../actions/lesson');
const axios = require('axios');

const lesson = module.exports = {
	load(store) {
		axios
		.get('http://localhost:5000/none-linear-education/us-central1/getLessons')
		.then(r => r.data)
		.then(lessons => {
			loadLessons(store, lessons);
		})
	}
};

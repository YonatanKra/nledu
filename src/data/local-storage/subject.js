let { loadSubjects } = require('../actions/subject');
const axios = require('axios');
const subjectPath = require('../../common/servicePathes').subject;

const subject = module.exports = {
	async load(store) {
		const res = await axios.get(subjectPath.getSubjects);
		const data = await res.data;

		loadSubjects(store, data);
	}
};

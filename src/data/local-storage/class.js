let commaList = require('./comma-list');
let { createClass, loadClasses } = require('../actions/class');
const axios = require('axios');
const classesPath = require('../../common/servicePathes').classes;

const schoolClass = module.exports = {
	update(func) {
		const transaction = {
			classIds: window.localStorage.getItem('twine-classes') || ''
		};

		func(transaction);

		window.localStorage.setItem('twine-classes', transaction.classIds);
	},
	saveClass(transaction, schoolClass) {
		if (!schoolClass.id) {
			throw new Error('Class has no id');
		}

		transaction.classIds = commaList.addUnique(
			transaction.classIds,
			schoolClass.id
		);

		window.localStorage.setItem(
			'twine-classes-' + schoolClass.id,
			JSON.stringify(
				Object.assign({}, schoolClass)
			)
		);
	},
	create(store, schoolClass) {
		if (schoolClass && !schoolClass.id){
			axios
			.post(classesPath.addClass,schoolClass)
			.then(r => r.data)
			.then(classes => {
				createClass(store, classes[0]);
			})
			.catch(err=>{
				err.message + " " + err.response.data
			})
		}

	
	},
	load(store) {
		axios
		.get(classesPath.getClasses)
		.then(r => r.data)
		.then(classes => {
			
			loadClasses(store, classes);
		})
		.catch(err=>{
			err.message + " " + err.response.data
		})
	}
};

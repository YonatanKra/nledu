let commaList = require('./comma-list');
let { createClass, loadClasses } = require('../actions/class');
const axios = require('axios');

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
			.post('http://localhost:5000/none-linear-education/us-central1/addClass',schoolClass)
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
		.get('http://localhost:5000/none-linear-education/us-central1/getClasses')
		.then(r => r.data)
		.then(classes => {
			
			loadClasses(store, classes);
		})
		.catch(err=>{
			err.message + " " + err.response.data
		})
/*
		const classes = {};
		const serializedClasses = window.localStorage.getItem('twine-classes');

		if (!serializedClasses) {
			return;
		}

		serializedClasses.split(',').forEach(id => {
			const newClass = JSON.parse(
				window.localStorage.getItem('twine-classes-' + id)
			);

			if (newClass) {
				/* Coerce the lastUpdate property to a date. 

				if (newClass.lastUpdate) {
					newClass.lastUpdate = new Date(
						Date.parse(newClass.lastUpdate)
					);
				}
				else {
					newClass.lastUpdate = new Date();
				}

				classes[newClass.id] = newClass;
			}
			else {
				console.warn(
					`Could not parse class ${id}, skipping`,
					window.localStorage.getItem('twine-classes-' + id)
				);
			}
		});

		/* Finally, we dispatch actions to add the classes to the store. 

		Object.keys(classes).forEach(id => {
			createClass(store, classes[id]);
		});*/
	}
};

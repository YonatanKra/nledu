let commaList = require('./comma-list');
let { createClass } = require('../actions/class');

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
	load(store) {
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
				/* Coerce the lastUpdate property to a date. */

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

		/* Finally, we dispatch actions to add the classes to the store. */

		Object.keys(classes).forEach(id => {
			createClass(store, classes[id]);
		});
	}
};

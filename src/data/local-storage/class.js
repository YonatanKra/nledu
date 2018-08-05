let commaList = require('./comma-list');

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
	}
};

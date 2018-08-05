let commaList = require('./comma-list');

const student = module.exports = {
	update(func) {
		const transaction = {
			studentIds: window.localStorage.getItem('twine-students') || ''
		};

		func(transaction);

		window.localStorage.setItem('twine-students', transaction.studentIds);
	},
	saveStudent(transaction, student) {
		if (!student.id) {
			throw new Error('Student has no id');
		}

		transaction.studentIds = commaList.addUnique(
			transaction.studentIds,
			student.id
		);

		window.localStorage.setItem(
			'twine-students-' + student.id,
			JSON.stringify(
				Object.assign({}, student)
			)
		);
	}
};

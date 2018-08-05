let commaList = require('./comma-list');
let { createStudent } = require('../actions/student');

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
	},
	load(store) {
		const students = {};
		const serializedStudents = window.localStorage.getItem('twine-students');

		if (!serializedStudents) {
			return;
		}

		serializedStudents.split(',').forEach(id => {
			const newStudent = JSON.parse(
				window.localStorage.getItem('twine-students-' + id)
			);

			if (newStudent) {
				/* Coerce the lastUpdate property to a date. */

				if (newStudent.lastUpdate) {
					newStudent.lastUpdate = new Date(
						Date.parse(newStudent.lastUpdate)
					);
				}
				else {
					newStudent.lastUpdate = new Date();
				}

				students[newStudent.id] = newStudent;
			}
			else {
				console.warn(
					`Could not parse student ${id}, skipping`,
					window.localStorage.getItem('twine-students-' + id)
				);
			}
		});

		/* Finally, we dispatch actions to add the students to the store. */

		Object.keys(students).forEach(id => {
			createStudent(store, students[id]);
		});
	}
};

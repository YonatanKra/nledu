let commaList = require('./comma-list');
let { createStudent, loadStudents } = require('../actions/student');
const axios = require('axios');

const student = module.exports = {
	createStudent(store, student){
		if (student && !student.id){
			axios
			.post('http://localhost:5000/none-linear-education/us-central1/addStudent',student)
			.then(r => r.data)
			.then(students => {
				createStudent(store, students[0]);
			})
			.catch(err=>{
				err.message + " " + err.response.data
			})
		}
	},
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

		axios
		.get('http://localhost:5000/none-linear-education/us-central1/getStudents')
		.then(r => r.data)
		.then(students => {
			
			loadStudents(store, students);
		})
	}
};

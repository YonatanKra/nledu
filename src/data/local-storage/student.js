let commaList = require('./comma-list');
let { createStudent, loadStudents } = require('../actions/student');
const axios = require('axios');
const {person} = require('../../common/servicePathes');
const {signUpWithEmailAndPassword} = require('../../common/auth');
const {showMessage} = require('../../components/snackbar/snackbar');
const {uploadImage} = require('../../common/fileUploader');

const student = module.exports = {
	async updateStudent(store, student){
		debugger;
		if (student && student.id){
			try {
				if(student.profile_img==='image' && student.imageDataURL){
					await uploadImage('images/persons/' + student.id +'.png', student.imageDataURL);
				}

				const res = await axios.post(person.updatePerson,student);
				const data = await res.data;
				
				showMessage("User data saved")
			} catch (error) {
				showMessage(error)
			}
		}
	},
	async createStudent(store, student){
		debugger;
		if (student && !student.id){
			try {
				const user = await signUpWithEmailAndPassword(student.email, student.password)

				student.id = user.uid;

				const res = await axios.post(person.addPerson,student);
				const data = await res.data;
				
				createStudent(store, data);
			} catch (error) {
				showMessage(error)
			}
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
		.get(person.getPersons)
		.then(r => r.data)
		.then(students => {
			
			loadStudents(store, students);
		})
	},
};

let {
	loadAssignment,
	createAssignment
} = require('../actions/assignment');
let {
	incrementSemaphore,
	decrementSemaphore
} = require('../actions/loader');
const assignmentPath = require('../../common/servicePathes').assignment;
const {
	showMessage
} = require('../../components/snackbar/snackbar');
const axios = require('axios');

const assignment = module.exports = {
	async load(store) {
		incrementSemaphore(store);

		const res = await axios.get(assignmentPath.getAssignments);
		const data = await res.data;
		const assignment = data.map(a => Object.assign({},
			Object.assign({}, a.assignment, {
				lessons: a.lessons
			})
		))

		loadAssignment(store, assignment);
		decrementSemaphore(store);
	},
	async createAssignment(store, assignmentObject) {
		if (assignmentObject && !assignmentObject.id) {
			try {

				const res = await axios.post(assignmentPath.addAssignment, assignmentObject);
				const data = await res.data;

				data.map(x => Object.assign(x.assignment, {
						lessons: x.lessons
					}))
					.forEach(newAssignment => createAssignment(store, newAssignment))


				showMessage('Assignment Saved successfully')
			} catch (error) {
				showMessage(error)
			}
		}
	},
	async updateAssignment(store, assignmentObject) {
		if (!assignmentObject.id) {
			throw new Error('assignment has no id');
		}
			try {
				debugger
				const res = await axios.post(assignmentPath.updateAssignment, assignmentObject);
				const data = await res.data;

			//	createLesson(store, les);

				showMessage('Assignment Saved successfully')
			} catch (error) {
				showMessage(error)
			}
	}
};

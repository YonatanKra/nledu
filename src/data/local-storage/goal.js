let { loadGoals, createGoal } = require('../actions/goal');
const axios = require('axios');
const goalPath = require('../../common/servicePathes').goal;
let {
	incrementSemaphore,
	decrementSemaphore
} = require('../actions/loader');
const {
	showMessage
} = require('../../components/snackbar/snackbar');

const goal = module.exports = {
	async load(store) {
		incrementSemaphore(store);

		const res = await axios.get(goalPath.getGoals);
		const data = await res.data;

		loadGoals(store, data);
		decrementSemaphore(store);
	},
	async createGoal(store, goalObject) {
		debugger;
		if (goalObject && !goalObject.id) {
			try {
				const res = await axios.post(goalPath.addGoal, goalObject);
				const data = await res.data;

				createGoal(store, data);

				showMessage('Goal Saved successfully')
			} catch (error) {
				showMessage(error)
			}
		}
	}
};

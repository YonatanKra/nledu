const uuid = require('tiny-uuid');

function getClassById(state, id) {
	let schoolClass = state.classes.find(schoolClass => schoolClass.id === id);

	if (!schoolClass) {
		throw new Error(`No class exists with id ${id}`);
	}

	return schoolClass;
}

const classStore = module.exports ={
	state: {
		classes: []
	},
	mutations: {
		CREATE_CLASS(state, props) {
			const schoolClass = Object.assign(
				{
					id: uuid(),
					lastUpdate: new Date()
				},
				props
			);

			state.classes.push(schoolClass);
		},
		UPDATE_CLASS(state, id, props) {
			const schoolClass = getClassById(state, id);

			Object.assign(schoolClass, props);
			schoolClass.lastUpdate = new Date();
		}
	}
};

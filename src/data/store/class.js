const uuid = require('tiny-uuid');

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
		}
	}
};

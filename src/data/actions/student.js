const actions = module.exports = {
	loadStudents(store, props) {

		const normalizedProps = Object.assign({}, props.data || props);

		store.dispatch('SET_STUDENTS', normalizedProps)
	},
	createClass(store, props) {
		const normalizedProps = Object.assign({}, props.data || props);

		store.dispatch('CREATE_CLASS', normalizedProps);
	},
};

const actions = module.exports = {
	createStudent(store, props) {
		const normalizedProps = Object.assign({}, props);

		store.dispatch('CREATE_STUDENT', normalizedProps);
	}
};

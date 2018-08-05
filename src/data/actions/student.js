const actions = module.exports = {
	createStudent(store, props) {
		const normalizedProps = Object.assign({}, props.data || props);

		store.dispatch('CREATE_STUDENT', normalizedProps);
	}
};

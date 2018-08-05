const actions = module.exports = {
	createClass(store, props) {
		const normalizedProps = Object.assign({}, props.data);

		store.dispatch('CREATE_CLASS', normalizedProps);
	}
};

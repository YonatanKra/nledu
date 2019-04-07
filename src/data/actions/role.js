
const roles = module.exports = {
	loadRoles(store, props) {
		const normalizedProps = Object.assign({}, props.data || props);

		store.dispatch('SET_ROLES', normalizedProps)
	}
};

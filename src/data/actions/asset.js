const asset = module.exports = {
	loadAssets(store, props) {
		store.dispatch('SET_ASSETS', props.data || props)
	},
	createAsset(store, props) {
		store.dispatch('CREATE_ASSETS', props.data || props);
	}
};
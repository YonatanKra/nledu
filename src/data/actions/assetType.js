
const assetTypes = module.exports = {
	loadAssetTypes(store, props) {
		store.dispatch('SET_ASSETS_TYPES',  props.data || props)
	}
};

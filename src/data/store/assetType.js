const assetTypeStore = module.exports ={
	state: {
		assetType: []
	},
	mutations: {
		SET_ASSETS_TYPES (state, assetTypes) {
			state.assetTypes = assetTypes
		  }
	}
};
const assetStore = module.exports ={
	state: {
		assets: []
	},
	mutations: {
		SET_ASSETS (state, assets) {
			state.assets = assets
		  },
		  CREATE_ASSETS(state, props) {
			if(props && props.id){
				state.assets.push(props);
			}
		}
	}
};
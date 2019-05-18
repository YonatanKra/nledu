let { loadAssets , createAsset} = require('../actions/asset');
const axios = require('axios');
const {showMessage} = require('../../components/snackbar/snackbar')
const {assetsPath} = require('../../common/servicePathes');

const asset = module.exports = {
	load(store) {
		axios
		.get(assetsPath.getAssets)
		.then(r => r.data)
		.then(assets => {
			loadAssets(store, assets);
		})
	},
	createAsset(store, asset){
		if (asset && !asset.id){
			axios
			.post(assetsPath.addAsset,asset)
			.then(r => r.data)
			.then(asset => {
				createAsset(store, asset);
				showMessage("Asset created successfully");
			})
			.catch(err=>{
				 
				showMessage("Error creating new asset: "+ err.message + " " + err.response.data);

			})
		}
	},
};

let { loadAssetTypes } = require('../actions/assetType');
let { incrementSemaphore, decrementSemaphore } = require('../actions/loader');
const url = require('../../common/servicePathes').assetsPath
const axios = require('axios');

const assetType = module.exports = {
	load(store) {
		incrementSemaphore(store);
		axios
		.get(url.getAssetTypes)
		.then(r => r.data)
		.then(assetTypes => {
			loadAssetTypes(store, assetTypes);
			decrementSemaphore(store);
		})
	}
};

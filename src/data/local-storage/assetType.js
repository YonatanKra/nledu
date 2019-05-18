let { loadAssetTypes } = require('../actions/assetType');
let { incrementSemaphore, decrementSemaphore } = require('../actions/loader');

const axios = require('axios');

const assetType = module.exports = {
	load(store) {
		incrementSemaphore(store);
		axios
		.get('http://localhost:5000/none-linear-education/us-central1/getAssetTypes')
		.then(r => r.data)
		.then(assetTypes => {
			loadAssetTypes(store, assetTypes);
			decrementSemaphore(store);
		})
	}
};

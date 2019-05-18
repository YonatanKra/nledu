/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {

	},
	data: {
		filterAsset: String
	},
	methods: {
		selectAsset() {

		}
	},
	computed: {
		filteredAssets: function () {
			if (this.filterAsset) {
				return this.assets.filter(x => x.name.indexOf(this.filterAsset) != -1 ||
					(x.description && x.description.indexOf(this.filterAsset) != -1));
			} else {
				return this.assets;
			}
		}
	},
	filters: {

	},
	ready() {},

	vuex: {
		actions: {},

		getters: {
			assets: state => state.asset.assets,
			assetTypes: state => state.assetType.assetTypes,
		}
	}
});

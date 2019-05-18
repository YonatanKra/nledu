/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');

const {
	createAsset
} = require('../../data/actions/asset');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {

		selectedType: Number
	},
	data: () => ({
		selectedAssetType : {},
		obj: {
			name: '',
			description: '',
			tags: '',
			type: '',
			id: ''
		},
		sbj: {}
	}),
	methods: {
		
		save() {
			const asset = Object.assign({}, this.obj, {uploader:'404f25df-9133-4fb2-88af-732c14dea843', type : this.selectedAssetType.id});
			this.createAsset(asset);
		}
	},
	computed: {

		assetTypesList: function () {
			return Object.keys(this.assetTypes || []).map(id => this.assetTypes[id])
		}

	},
	filters: {},
	components: {
		'drop-down': require('../drop-down'),
		'expanding-buttons': require('../expanding-buttons'),
		'tags-selector' : require('../tags-selector')
	},
	ready() {

	},

	vuex: {
		actions: {
			createAsset
		},

		getters: {
			assetTypes: state => state.assetType.assetTypes,
		}
	}

});

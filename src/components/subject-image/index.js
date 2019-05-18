const Vue = require('vue');
const vuex = require('vuex');


module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		imageSrc : String,
		imageClass : String
	},
	data: {},
	methods: {
	
	},
	computed: {
		imageSource: function () {

            const image = require('./images/' + this.imageSrc);
			return image;
		},
	},
	filters: {},
	ready() {},

	vuex: {
		actions: {},

		getters: {
		
		}
	}
});

const Vue = require('vue');
const vuex = require('vuex');
const {getImage} = require('./service');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		person: {},
		imageClass: String
	},
	data: {},
	methods: {

	},
	computed: {
        
		imageSource: function () {
          
          return getImage(this.person);
		},
	},
	filters: {},
	ready() {},

	vuex: {
		actions: {},

		getters: {
			roles: state => state.role.roles,
		}
	}
});

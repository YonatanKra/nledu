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
	data: () => ({
	
	}),
	methods: {
	
		
	},
	computed: {

	
	},
	filters: {

	},
	ready() {
	
	},

	components: {
		//'drop-down': require('../../../drop-down'),
		
	
	},

	vuex: {
		actions: {},

		getters: {
			stories: state => state.story.stories,
			roles: state => state.role.roles,
			statuses: state => state.status.statuses,
			cities: state => state.city.cities,
			classes: state => state.class.classes,

		}
	}

});

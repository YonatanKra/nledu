/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		stories : []

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
		'stories-list': require('../../../../stories-list'),
	},

	vuex: {
		actions: {},

		getters: {
           // stories: state => state.story.stories,
		}
	}

});

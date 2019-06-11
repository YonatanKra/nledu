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
	//	tagsList : []
	}),
	methods: {
	
		
	},
	computed: {
		tagsList: function () {
		
			return this.stories.map(s=>s.tags).join(',').split(',').filter(x=>x.length);
		}
	
	},
	filters: {

	},
	ready() {
		
	
	},

	components: {
		'lessons-progress': require('../learn/lessons-progress'),
		'word-cloud': require('../../word-cloud'),
		'tasks-list': require('../../assignment/tasks-list')
		
	
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

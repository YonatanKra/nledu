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
		obj: {
			comment:'',
			due_date :'',			
			lessons: [],
			students : []
		},
	}),
	methods: {
		addLesson() {

		}
	},
	computed: {


	},
	filters: {

	},
	ready() {


	},

	components: {

		'lesson-small-list': require('../lesson-small-list'),
		'persons-small-list' : require('../persons-small-list')
		//'stories-list': require('../../stories-list'),
	},

	vuex: {
		actions: {
		//	createLesson
		},

		getters: {

		}
	}

});

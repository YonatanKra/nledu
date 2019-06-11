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
		selectedSubject : {}
	}),
	methods: {
		selectSubject(subject) {
			this.selectedSubject = subject;		
		}
	},
	computed: {


	},
	filters: {

	},
	ready() {


	},

	components: {

		'subject-image': require('../../subject-image'),
		'learn-tasks' : require('./learrn-tasks'),
		'assignment-small-list' : require('../../../components/assignment/assignment-small-list')
	},

	vuex: {
		actions: {
		},

		getters: {
            subjects: state=>state.subject.subjects
		}
	}

});

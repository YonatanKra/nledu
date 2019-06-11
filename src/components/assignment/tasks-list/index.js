/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
        lessons : []
	},
	data: {

	},
	methods: {
	
	},
	computed: {
        tasks: function () {
			return this.assignments.filter(m=>m.lessons.length===0 && m.comment && m.comment.length>5)

		},
	},
	filters: {
	
	},
	ready() {


	},

	components: {

		//'lessons-list': require('../../lessons-list'),
	},

	vuex: {
		actions: {
			//createLesson
		},

		getters: {
			lessonsList: state => state.lesson.lessons,
			statuses: state => state.status.statuses,
			assignments: state => state.assignment.assignments,
		}
	}

});

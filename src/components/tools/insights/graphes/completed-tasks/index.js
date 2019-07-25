const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');
const c3 = require('c3');
require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {


	},
	data: {

	},
	methods: {

	},
	computed: {


	},
	filters: {

	},

	ready() {

        const chartElement = this.$el.querySelector('.chart');
        const num = this.assignments.filter(x=>x.status===3).length * 100 /this.assignments.length ;
        var chart = c3.generate({
			bindto: chartElement,
			data: {
				columns: [
					['data', num]
				],
				type: 'gauge',
			}
		});

	},

	components: {

	},

	vuex: {
		actions: {
			//createAssignment
		},

		getters: {
			currentUser: state => state.auth.currentUser,
			stories: state => state.story.stories,
			subjects: state => state.subject.subjects,
			assignments: state => state.assignment.assignments,

		}
	}
});

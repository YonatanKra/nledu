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

		const openTasksAgg = this.assignments.map(a => a.created_date.split('T')[0]).reduce((a, b) => {
			if (!a[b]) {
				a[b] = 0
			}
			a[b]++;
			return a;
		}, {});

		const chartElement = this.$el.querySelector('.chart');


		var chart = c3.generate({
			bindto: chartElement,
			data: {
				x: 'x',
				columns: [
					['x'].concat(Object.keys(openTasksAgg)),
					['data1'].concat(Object.values(openTasksAgg)),
				]
			},
			axis: {
				x: {
					type: 'timeseries',
					tick: {
						format: '%Y-%m-%d'
					}
				}
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

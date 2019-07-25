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

		const data =[['x'].concat(Array.apply(null, {
			length: 30
		}).map(Number.call, Number).map(t => moment().subtract(t + 1, 'day').format('YYYY-MM-DD')))]
	.concat(this.students.filter(s => s.role === 4).map(s => [s.first_name + ' ' + s.surname].concat(Array.from({
		length: 30
	}, () => Math.floor(Math.random() * 40)))));

		var chart = c3.generate({
			bindto: chartElement,
			data: {
				x: 'x',
				columns: data
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
			students: state => state.student.students,

		}
	}
});

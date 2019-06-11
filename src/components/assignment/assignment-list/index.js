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


	},
	data: {

	},
	methods: {
		addLesson() {

		}
	},
	computed: {
		flatList: function () {
			const list = [];

			this.assignments.forEach(assignment => {
				const item = Object.assign({}, assignment);

				item.assignee_name = this.students.filter(s => s.id === assignment.assignee)
					.map(s => s.first_name + ' ' + s.surname)[0];

				item.assigner_name = this.students.filter(s => s.id === assignment.assigner)
					.map(s => s.first_name + ' ' + s.surname)[0]

				item.status_name = this.statuses[assignment.status];

				list.push(item);
			});

			return list;

		}
	},
	filters: {
		moment: function (date) {
			return date ? moment(date).format('DD/MM/YYYY') : '-';
		},
		statusIcon: function (s) {
			switch (s) {
				case "active":
					return 'how_to_reg';
				case "archived":
					return 'archive';
				case "resolved":
					return 'done';
				case "pending":
					return 'access_time';
				case "visible":
					return 'visible';
				case "editing":
					return 'insert_drive_file';
			}
		}
	},
	ready() {
		componentHandler.upgradeDom();

	},

	components: {

		'progress-story-indicator': require('./progress-story-indicator'),
	},

	vuex: {
		actions: {
			//createLesson
		},

		getters: {
			students: state => state.student.students,
			statuses: state => state.status.statuses,
			assignments: state => state.assignment.assignments,
		}
	}

});

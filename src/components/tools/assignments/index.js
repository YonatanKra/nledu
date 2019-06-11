/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');
const {
	prompt
} = require('../../slide-panel-prompt');

const {
	createAssignment
} = require('../../../data/actions/assignment');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {


	},
	data: {

	},
	methods: {
		createAssignmentDelegate() {
			prompt({
					panelComponent: 'assignment-panel',
					title: 'Add new assignment',
					panelSize: 'large',
					componentObject: () => {
						return require('./assignment-form')
					}
				}, this)
				.then(data => {
					if (data) {
						debugger;
						const assignment = data.data.obj;
						assignment.assigner = this.currentUser.uid;
						if (assignment.due_date === '') {
							delete assignment.due_date;
						} else {
							assignment.due_date = moment(assignment.due_date, 'dd/mm/yyyy');
						}

						assignment.lessons = assignment.lessons.map(l => {
							return {
								lesson_id: l
							}
						});

						this.createAssignment(assignment);
					}
				}).catch(err => {
					debugger;
				});
		}
	},
	computed: {


	},
	filters: {

	},
	ready() {


	},

	components: {

		'assignment-list': require('../../assignment/assignment-list'),

	},

	vuex: {
		actions: {
			createAssignment
		},

		getters: {
			currentUser: state => state.auth.currentUser,

		}
	}

});

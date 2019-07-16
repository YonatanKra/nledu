/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');
const {updateAssignment} = require('../../../data/actions/assignment')

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		lessons : [],
		personId : String
	},
	data: {

	},
	methods: {
		markAsDone(task, $event) {
			if(!task.isDone){
				task.isDone = true;
				task.status = 3;
				task.end_date = new Date();
				task.last_update_date  = new Date();
				this.updateAssignment(task.id, task);

			}else{
				$event.preventDefault();
			}
		},
	},
	computed: {
        tasks: function () {
		return (this.personId ?this.assignments.filter(m=>m.lessons.length===0 && m.comment && m.assignee === this.personId) :
			 this.assignments.filter(m=>m.lessons.length===0 && m.comment && m.comment.length>5))
			 .map(f=>Object.assign({}, f, {isDone : f.status===3}))
			 ;

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
			updateAssignment
		},

		getters: {
			lessonsList: state => state.lesson.lessons,
			statuses: state => state.status.statuses,
			assignments: state => state.assignment.assignments,
		}
	}

});

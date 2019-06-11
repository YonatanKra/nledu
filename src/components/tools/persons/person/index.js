/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');
const promptPanel = require('../../../slide-panel-prompt').prompt;
const {
	updateStudent
} = require('../../../../data/actions/student');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		personId: {
			type: String,
			required: true
		}

	},
	data: {

	},
	methods: {
        editPersonDelegate : function(){
            promptPanel({
				panelComponent: 'person-panel',
				panelSize: 'large',
				title: 'Update Person - ' + this.person.first_name + ' ' + this.person.surname,
				obj: this.person,
				componentObject: () => {
					return require('../person-form')
				}
			}, this)
			.then(data => {
				if (data) {
					debugger;
					const studentToUpdate = data.data.obj;
					this.updateStudent(studentToUpdate);
				}

			}).catch(err => {
				debugger;
			});
        }
	},
	components: {
        'person-image': require('../../../person-image'),
	},
	computed: {
		person: function () {
			return this.students.find(l => l.id === this.personId);
		},
		classesDict: function () {
			return this.classes.reduce((a, b) => {
				a[b.id] = b;
				return a;
			}, {});
		},
	},
	filters: {
		moment: function (date) {
			return moment(date).format('DD/MM/YYYY');
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


	},

	vuex: {
		actions: {
			updateStudent
		},

		getters: {
            students: state => state.student.students,
			lessons: state => state.lesson.lessons,
			stories: state => state.story.stories,
			subjects: state => state.subject.subjects,
			goals: state => state.goal.goals,
			classes: state => state.class.classes,

		}
	}

});

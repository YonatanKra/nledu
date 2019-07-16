const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');
const {
	postMessage
} = require('../../../data/actions/message');

const {
	createAssignment
} = require('../../../data/actions/assignment');


require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		selectedContact: {}
	},
	data: () => ({
		inputMessage: '',

	}),
	methods: {
		sendMessage(isTask) {
			debugger;
			const messageObj = {
				to: this.selectedContact.id,
				from: this.currentUser.uid,
				content: this.inputMessage,
				timeSpan: new Date(),
				isTask: isTask,
				isDone: false
			};

			if (isTask) {
				const assignment = {
					"comment": messageObj.content,
					"lessons": [],
					"students": [messageObj.to],
					"assigner": messageObj.from
				};
				this.createAssignment(assignment);
			}

			this.postMessage(messageObj);
		}
	},
	computed: {
		subSubjects: function () {
			return [];
		},
		personsDict: function () {
			return this.students.reduce((a, b) => {
				a[b.id] = b;
				return a;
			}, {});
		}
	},
	filters: {
		momentFormat: function (date) {
			return moment(date).fromNow();
		}
	},
	ready() {},
	components: {
		//	'subject-image': require('../subject-image')
	},

	vuex: {
		actions: {
			postMessage,
			createAssignment
		},

		getters: {
			students: state => state.student.students,
			roles: state => state.role.roles,
			//statuses: state => state.status.statuses,
			//cities: state => state.city.cities,
			//classes: state => state.class.classes,
			currentUser: state => state.auth.currentUser,
			//messages: state => state.message.messages,
		}
	}
});

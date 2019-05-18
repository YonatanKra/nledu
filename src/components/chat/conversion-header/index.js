const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');
const {
	postMessage
} = require('../../../data/actions/message');


require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		selectedContact:{}
	},
	data: () => ({


	}),
	methods: {
		selectTo(toItem) {
			this.toItem = toItem;
		},
	},
	computed: {
		messages() {
			return (this.messagesList || []).filter(message => (message.to === (this.selectedContact || {}).id && message.from === this.currentUser.uid) ||
				(message.from === (this.selectedContact || {}).id && message.to === this.currentUser.uid))
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
		'person-image': require('../../person-image')
	},

	vuex: {
		actions: {
			//postMessage
		},

		getters: {
			students: state => state.student.students,
			roles: state => state.role.roles,
			//statuses: state => state.status.statuses,
			//cities: state => state.city.cities,
			//classes: state => state.class.classes,
			currentUser: state => state.auth.currentUser,
			messagesList: state => state.message.messages,
		}
	}
});

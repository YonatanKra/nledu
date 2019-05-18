const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');
const {
	postMessage
} = require('../../data/actions/message');


require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {

	},
	data: () => ({
		toItem: {},
		fromItem: {},
		inputMessage: '',

	}),
	methods: {
		selectTo(toItem) {
			this.toItem = toItem;
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
			'contact-list': require('./contact-list'),
			'conversion': require('./conversion'),
			'send-text': require('./send-text'),
			'conversion-header': require('./conversion-header'),
	},

	vuex: {
		actions: {
			postMessage
		},

		getters: {
			students: state => state.student.students,
			roles: state => state.role.roles,
			statuses: state => state.status.statuses,
			cities: state => state.city.cities,
			classes: state => state.class.classes,
			currentUser: state => state.auth.currentUser,
			messages: state => state.message.messages,
		}
	}
});

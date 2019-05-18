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
		selectedContact: {}
	},
	data: () => ({
		contantSearch: ''

	}),
	methods: {
		selectTo(contact) {
			this.selectedContact = contact;
		},
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
		},
		filterContacts() {
			return this.contantSearch === '' ? this.students : this.students.filter(person =>
				person.first_name.toLowerCase().indexOf(this.contantSearch) > -1 || person.surname.toLowerCase().indexOf(this.contantSearch) > -1)
		}
	},
	ready() {
		this.selectTo(this.students[0]);
	},
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
			//messages: state => state.message.messages,
		}
	}
});

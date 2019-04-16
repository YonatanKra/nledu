const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');
const {	createClass} = require('../../../data/actions/class');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	data: {
		insert_city: '',
		insert_grade: '',
		insert_school: ''
	},
	props: {

	},

	computed: {
		filteredCities: function () {
			return this.cities.filter(x => x.name.indexOf(this.insert_city) != -1).splice(0, 5);
		}
	},
	components: {
		'expanding-card': require('../../expanding-card'),
	},
	methods: {
		createClassDelegate(e) {
			const data = {
				grade: this.insert_grade,
				school: this.insert_school,
				city: this.insert_city
			}

			this.createClass(data);
		},
		selectCityDelegate(e) {
			this.insert_city = e.currentTarget.getAttribute('data-city-name')
		}
	},
	filters: {
		moment: function (date) {
			return moment(date).format('MMMM Do YYYY, h:mm:ss a');
		}
	},

	vuex: {
		actions: {
			createClass
		},
		getters: {
			cities: function (state) {
				return state.city.cities
			},
			statuses: function (state) {
				return state.status.statuses
			},
			classes: function (state) {
				return state.class.classes;
			},
		}
	}
});

/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const uuid = require('tiny-uuid');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {


	},
	data: () => ({
		obj: {
            grade: '',
            school: '',
            city : ''
		},
	}),
	methods: {
		uploadImageChange() {

        },
        selectCityDelegate(e) {
			this.obj.city = e.currentTarget.getAttribute('data-city-name')
		}
	},
	computed: {
        filteredCities: function () {
			return this.cities.filter(x => x.name.indexOf(this.obj.city) != -1).splice(0, 5);
		}
	},
	filters: {

	},
	ready() {
		
	},

	components: {

	},

	vuex: {
		actions: {},

		getters: {
            cities: state => state.city.cities,
		}
	}

});

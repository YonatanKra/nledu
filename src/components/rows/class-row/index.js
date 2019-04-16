/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		classId: String,
		classGrade: String,
		classSchool: String,
		classCity: String,

	},
	data: {

	},
	methods: {

	},
	computed: {


	},
	filters: {

	},
	ready() {
		const selected = this.classes.find(cls => cls.id === this.classId);

		if(selected){
			this.classGrade = selected.grade;
			this.classSchool = selected.school;
			this.classCity = selected.city;
		}
	
	},

	vuex: {
		actions: {},

		getters: {
			classes: function (state) {
				return state.class.classes;
			},
		}
	}

});

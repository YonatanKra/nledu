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
	

	},

	vuex: {
		actions: {},

		getters: {
			lessons: function (state) {
                return [
                    {id:"1",name:'ddd'},
                    {id:"2",name:'sdfdsf'},
                    {id:"3",name:'ddsdfdsd'},
                    {id:"4",name:'dadsadadd'},
                ]
				return state.lesson.lessons;
			},
		}
	}

});

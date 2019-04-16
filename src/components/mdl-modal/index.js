/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const MDL_MODAL = require('./src');


require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		modalTitle: String,
		classGrade: String,

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
         MDL_MODAL.bindTriggers();
	},

});

/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const Quill = require('quill');

require('quill/dist/quill.core.css');
require('quill/dist/quill.snow.css');
require('quill/dist/quill.bubble.css');
require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
	

	},
	data: {

	},
	methods: {

    },
    compiled(){
        
        var container = this.$el.querySelector('.place-holder');
        var editor = new Quill(container);
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
	
		}
	}

});

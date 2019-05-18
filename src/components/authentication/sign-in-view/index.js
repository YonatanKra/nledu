/*
Draws connector lines between passages.
*/
'use strict';
const Vue = require('vue');
const vuex = require('vuex');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {


	},
	data: {
       
	},
	methods: {
        async bla(){
         

        }
	},
	computed: {


    },
    components: {
		'sign-up': require('../sign-up'),
		'sign-in': require('../sign-in')
	},
	filters: {

	},
	ready() {
	},

	vuex: {
		actions: {
            
        },

	}

});

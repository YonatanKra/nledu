/*
Draws connector lines between passages.
*/

const Vue = require('vue');
const vuex = require('vuex');


require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
	
    },
    
	components: {
		'persons-list' : require('../../persons-list')
	}

});

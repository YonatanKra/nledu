/**
 Manages showing the user a quick set of intro information, and then
 records that it's been shown.

 @class WelcomeView
 @extends Backbone.Marionette.ItemView
**/

'use strict';
const Vue = require('vue');

require('./index.less');

let tools = [];

const initTools = ()=>{
	tools.push({
		name: 'Home',
		order: 1,
		icon: 'home',
		path: '/'
	});

	tools.push({
		name: 'Inbox',
		order: 2,
		icon: 'inbox',
		path: '/inbox'
	});

	tools.push({
		name: 'Delete',
		order: 2,
		icon: 'delete',
		path: '/delete'
	});


	tools.push({
		name: 'Report',
		order: 2,
		icon: 'report',
		path: 'persons'
	});


}
initTools();
module.exports = Vue.extend({
	template: require('./index.html'),

	data: () => ({
		/* How many sections are currently visible. */
		shown: 1,
		tools : tools
	}),

	methods: {

	},

	vuex: {
		actions: {
			
		}
	}
});

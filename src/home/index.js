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
/*
	tools.push({
		name: 'Inbox',
		order: 2,
		icon: 'inbox',
		path: '/inbox'
	});
*/
	tools.push({
		name: 'Classes',
		order: 2,
		icon: 'delete',
		path: '#!/home/classes'
	});


	tools.push({
		name: 'Persons',
		order: 2,
		icon: 'report',
		path: '#!/home/persons'
	});

	tools.push({
		name: 'Lessons',
		order: 2,
		icon: 'report',
		path: '#!/home/lessons'
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

	ready() {
		componentHandler.upgradeDom();
	},
	filters: {
		
	},
	methods: {

	},

	vuex: {
		actions: {
			
		}
	}
});

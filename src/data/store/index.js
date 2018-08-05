// The main module managing the application's Vuex state and mutations.

let Vue = require('vue');
let Vuex = require('vuex');

Vue.use(Vuex);

module.exports = new Vuex.Store({
	modules: {
		appInfo: require('./app-info'),
		pref: require('./pref'),
		story: require('./story'),
		storyFormat: require('./story-format'),
		student: require('./student'),
		class: require('./class')
		storyFormat: require('./story-format'),
		storyComments: require('./story-comments')
	},

	plugins: [
		require('../local-storage')
	]
});

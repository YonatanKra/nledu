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
		role: require('./role'),
		status: require('./status'),
		asset: require('./asset'),
		assetType: require('./assetType'),
		city: require('./city'),
		class: require('./class'),
		goal: require('./goal'),
		lesson: require('./lesson'),
		subject: require('./subject'),
		auth: require('./auth'),
		loading: require('./loading'),
		storyComments: require('./story-comments'),
		message : require('./message'),
		assignment: require('./assignment')
	},

	plugins: [
		require('../local-storage')
	]
});

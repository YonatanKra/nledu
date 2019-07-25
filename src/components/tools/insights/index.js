/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');
const c3 = require('c3');
require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {


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

	components: {

		'count-sub-subjects': require('./graphes/count-sub-subjects'),
        'count-subjects': require('./graphes/count-subjects'),
        'count-tasks': require('./graphes/conut-tasks'),
		'count-grades': require('./graphes/count-grades'),
		'completed-tasks': require('./graphes/completed-tasks'),
		'time-usages': require('./graphes/time-usages'),
    },

	vuex: {
		actions: {
			//createAssignment
		},

		getters: {
            currentUser: state => state.auth.currentUser,
            stories: state => state.story.stories,
			subjects: state => state.subject.subjects,

		}
	}

});

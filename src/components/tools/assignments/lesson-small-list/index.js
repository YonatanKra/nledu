const Vue = require('vue');
const vuex = require('vuex');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
        selectedLessons : []
    	},
	data: {
		
	},
	methods: {
		getStyle(lesson){
		
		}
	},
	computed: {


	},
	filters: {

	},
	ready() {

		componentHandler.upgradeDom();


	},

	vuex: {
		actions: {
			
		},

		getters: {
			lessons: state=> state.lesson.lessons,
			stories: state => state.story.stories,
			subjects: state => state.subject.subjects,
			goals: state => state.goal.goals

		}
	}

});

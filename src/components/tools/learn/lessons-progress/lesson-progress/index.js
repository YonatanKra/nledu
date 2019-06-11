/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),
    
	props: {
        progressValue : Number,
        storyProgress : Object
	},
	data: {

	},
	methods: {
		addLesson() {

		}
	},
	computed: {
		assignedLessonsFlat: function () {

		}
	},
	filters: {
	
	},
	ready() {
        const progress = this.progressValue;
        

        componentHandler.upgradeDom();
        this.$el.querySelector('.mdl-progress').MaterialProgress.setProgress( progress|| 0);
      
	},

	components: {

	//	'progress-story-indicator': require('./progress-story-indicator'),
	},

	vuex: {
		actions: {
			//createLesson
		},

		getters: {
     //       lessons: state => state.lesson.lessons,

		}
	}

});

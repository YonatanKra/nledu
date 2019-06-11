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
	},
	data: () => ({
		progressColor : ''
	}),
	methods: {

	},
	computed: {

	},
	filters: {
	
	},
	ready() {
      this.progressValue = parseInt(this.progressValue) || 0;
      if(this.progressValue>=33 && this.progressValue<=66){
        this.progressColor = 'orange';
      }else if(this.progressValue>66){
        this.progressColor = 'green';
      }
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

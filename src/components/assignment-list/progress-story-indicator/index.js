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
        lessons : []
	},
	data: {

	},
	methods: {
	
	},
	computed: {
        lessonsDict: function () {
			return this.lessonsList.reduce((a, b) => {
				a[b.id] = b;
				return a;
			}, {});
		},
	},
	filters: {
		getIcon : function(prog){
            return prog === 0 ? 'panorama_fish_eye' :'lens';
        }
	},
	ready() {


	},

	components: {

		//'lessons-list': require('../../lessons-list'),
	},

	vuex: {
		actions: {
			//createLesson
		},

		getters: {
			lessonsList: state => state.lesson.lessons,
			statuses: state => state.status.statuses,
			assignments: state => state.assignment.assignments,
		}
	}

});

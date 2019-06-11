/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const storagePath = require('../../../../common/servicePathes').storage;

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		lessonId: {
			type: String,
			required: true
		}

	},
	data: {

	},
	methods: {
		getStyle(lesson){
			if(lesson.path){
				const path = 'images/lessons/' + lesson.id + '/' + lesson.path + '.png';
				const fullPath =  storagePath.storageURL +  encodeURIComponent(path) + storagePath.imageSuffix;
				return  'url(' + fullPath + ')  no-repeat #46B6AC;'
				;
			}
		},
	},
	components: {
		'stories-list': require('../../../stories-list'),
	},
	computed: {
		lesson: function () {
			return this.lessons.find(l => l.id === this.lessonId);
		},
		subSubjects() {
			return Object.keys(this.subjects).map(x => this.subjects[x].sub_subjects).flat().reduce((a, b) => {
				a[b.sub_subject_id] = b.sub_subject_name;
				return a;
			}, {})
		},
		goalsDict(){
			return this.goals.reduce((a,b)=>{
				a[b.id] = b;
				return a;
				},{});
		},
		extractSubjects() {
			if(this.stories.length && this.lesson){
				const relatedStories = this.lesson.stories.map(s=> this.stories.find(str=>str.id===s.story_id));
				const subjects = relatedStories.map(s=>s.sub_subject).flat();

				return Array.from(new Set(subjects.map(s=>this.subSubjects[s])));
			}

			return [];
		}
	},
	filters: {
		join(arr) {
			return arr.join(',')
		},
		
	},
	ready() {


	},

	vuex: {
		actions: {},

		getters: {
			lessons: state => state.lesson.lessons,
			stories: state => state.story.stories,
			subjects: state => state.subject.subjects,
			goals: state => state.goal.goals
		}
	}

});

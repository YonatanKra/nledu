/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		classId: String,
		classGrade: String,
		classSchool: String,
		classCity: String,

	},
	data: {

	},
	methods: {

	},
	computed: {
		subSubjects(){
		return	Object.keys(this.subjects).map(x=>this.subjects[x].sub_subjects).flat().reduce((a,b)=>{
				a[b.sub_subject_id] = b.sub_subject_name;
				return a;
				},{})
		}

	},
	filters: {
		join(arr){
			return arr.join(',')
		},
		extractSubjects(story){
			const relatedStories =this.stories.filter(s=>(story||[]).map(s=>s.story_id).indexOf(s.id)==-1) || [];

			return relatedStories.map(s=>this.subSubjects[s.sub_subject]).join(', ');		
		},
		extractGoals(str){
			if (this.goals.length){
				return str.map(g=>this.goals[g.goal_id].name).join(', ');	
			}

			return '';
			
		}
	},
	ready() {
	

	},

	vuex: {
		actions: {},

		getters: {
			lessons: function (state) {
				return state.lesson.lessons;
			},
			stories: state => state.story.stories,
			subjects: state => state.subject.subjects,
			goals: state => state.goal.goals

		}
	}

});

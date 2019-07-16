const Vue = require('vue');
const vuex = require('vuex');
const promptPanel = require('../slide-panel-prompt').prompt;
const {updateLesson} = require('../../data/actions/lesson');
const storagePath = require('../../common/servicePathes').storage;

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {	},
	data: {
		
	},
	methods: {
		getStyle(lesson){
			if(lesson.path){
				const path = 'images/lessons/' + lesson.id + '/' + lesson.path + '.png';
				const fullPath =  storagePath.storageURL +  encodeURIComponent(path) + storagePath.imageSuffix;
				return  'url(' + fullPath + ') bottom right 15% no-repeat #46B6AC;'
				;
			}
		},
		view(id) {
			window.location.hash += '/' + id
		},
		edit(id, $event) {
			event.stopPropagation();
			const lesson = this.lessons.find(les => les.id === id);
			const obj = Object.assign({}, lesson, {
				isNew: false,
				goals : (lesson.goals||[]).map(goal=>goal.goal_id + '')
			});

			promptPanel({
					panelComponent: 'lesson-panel',
					panelSize: 'large',
					title: 'Update Story - ' + obj.name,
					obj: obj,
					componentObject: () => {
						return require('../tools/lessons/lesson-form')
					}
				}, this)
				.then(data => {
					if (data) {
						debugger;
						const lessonToUpdate = data.data.obj;

						lessonToUpdate.goals= (lessonToUpdate.goals||[]).map(goal=>Object.assign({goal_id : goal}));

						this.updateLesson(lessonToUpdate.id, lessonToUpdate);
					}

				}).catch(err => {
					debugger;
				});
		},
	},
	computed: {
		lessonsList: function () {
			return this.lessons.filter(m=>m.status!==2)

		},

	},
	filters: {

	},
	ready() {



	},

	vuex: {
		actions: {
			updateLesson
		},

		getters: {
			lessons: function (state) {
				return state.lesson.lessons;
			},
			stories: state => state.story.stories,
			subjects: state => state.subject.subjects,
			goals: state => state.goal.goals,
			statuses: state => state.status.statuses
		}
	}

});

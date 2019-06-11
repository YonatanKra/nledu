/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');
const storagePath = require('../../../../common/servicePathes').storage;


require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {


	},
	data: {

	},
	methods: {
		addLesson() {

		},
		play(story) {
			window.open(
				'#/home/stories/' + story.id + '/play',
				'twinestory_play_' + story.id
			);
		},
		view(lesson) {
			window.location.hash += '/lessons/' + lesson.id;
		},
	},
	computed: {
		assignedLessonsFlat: function () {

			const list = [];

			this.lessons.filter(s=>s.status!=2).forEach(assignment => {
				const item = Object.assign({}, assignment);

				item.assignee_name = this.students.filter(s => s.id === assignment.assignee)
					.map(s => s.first_name + ' ' + s.surname)[0];

				item.assigner_name = this.students.filter(s => s.id === assignment.assigner)
					.map(s => s.first_name + ' ' + s.surname)[0]

				item.status_name = this.statuses[assignment.status];


				if(item.path){
					const path = 'images/lessons/' + item.id + '/' + item.path + '.png';
					const fullPath =  storagePath.storageURL +  encodeURIComponent(path) + storagePath.imageSuffix;
					
					item.imagePath = fullPath;
				}
		
				item.flatStories = item.stories.map(s => {
					const story = this.stories.find(x => x.id === s.story_id);
					const totalDuration =  story.passages.reduce((total, num) => {
						return total + parseInt(num.min_duration);
					}, 0);

					const progress = Math.floor(Math.random() * totalDuration) + 1;
					const progressPercentage = (progress / totalDuration) * 100

					return Object.assign({}, story, {
						totalDuration :totalDuration,
						progress : progress,
						progressPercentage : progressPercentage
					})
				});
	
				
				item.totalDuration = item.flatStories.reduce((total, num) => {
					return total + parseInt(num.totalDuration);
				}, 0);

				item.totalProgress = item.flatStories.reduce((total, num) => {
					return total + parseInt(num.progress);
				}, 0);


				item.progress = (item.totalProgress / item.totalDuration) * 100;

				list.push(item);
			});

			return list;

		}
	},
	filters: {
		moment: function (date) {
			return date ? moment(date).format('DD/MM/YYYY') : '-';
		},
		statusIcon: function (s) {
			switch (s) {
				case "active":
					return 'how_to_reg';
				case "archived":
					return 'archive';
				case "resolved":
					return 'done';
				case "pending":
					return 'access_time';
				case "visible":
					return 'visible';
				case "editing":
					return 'insert_drive_file';
			}
		}
	},
	ready() {
		componentHandler.upgradeDom();
	},

	components: {

		'lesson-progress': require('./lesson-progress'),
		'percentage-circle': require('../../../percentage-circle'),
	},

	vuex: {
		actions: {
			//createLesson
		},

		getters: {
			students: state => state.student.students,
			statuses: state => state.status.statuses,
			assignments: state => state.assignment.assignments,
			lessons: state => state.lesson.lessons,
			stories: state => state.story.stories,
		}
	}

});

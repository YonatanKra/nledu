/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const { prompt } = require('../../slide-panel-prompt');
const {createLesson} = require('../../../data/actions/lesson');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {


	},
	data: {

	},
	methods: {
		addLesson() {
			prompt({
					panelComponent: 'lesson-panel',
					title: 'Add new Leson',
					panelSize : 'large',
					componentObject: () => {
						return require('./lesson-form')
					}
				}, this)
				.then(data => {
					if (data) {
						const lesson = data.data.obj;

						debugger;
						lesson.creator = '404f25df-9133-4fb2-88af-732c14dea843';
						lesson.goals= (lesson.goals||[]).map(goal=>Object.assign({goal_id : goal}));
						this.createLesson(lesson);

					}
				}).catch(err => {
					debugger;
				});
		}
	},
	computed: {


	},
	filters: {

	},
	ready() {


	},

	components: {

		'lessons-list': require('../../lessons-list'),
		'stories-list': require('../../stories-list'),
	},

	vuex: {
		actions: {
			createLesson
		},

		getters: {

		}
	}

});

const Vue = require('vue');
const vuex = require('vuex');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		selectedSubSubject: {},
		selectedSubject: {}
	},
	data: {},
	methods: {
		selectSubject(subject_id) {
			this.selectedSubject = this.subjects[subject_id];
		},
		selectSubSubject(sub_subject) {
			this.selectedSubSubject = sub_subject;
		}
	},
	computed: {
		subSubjects: function () {
			return (this.selectedSubject && this.selectedSubject.sub_subjects) ?
				this.selectedSubject.sub_subjects : [];
		},
	},
	filters: {},
	ready() {},
	components: {
		'subject-image': require('../subject-image')
	},

	vuex: {
		actions: {},

		getters: {
			subjects: function (state) {
				return state.subject.subjects;
			},
		}
	}
});

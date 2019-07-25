const Vue = require('vue');
const vuex = require('vuex');
const moment = require('moment');
const c3 = require('c3');
require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {


	},
	data: {

	},
	methods: {

	},
	computed: {


	},
	filters: {

	},

	ready() {
		const agg = this.stories.map(s => s.sub_subject).reduce((a, b) => {
			if (!a[b]) {
				a[b] = 0
			};
			a[b]++;
			return a
        }, {});
        
		const cols = Object.values(this.subjects).map(s => s.sub_subjects).flat().map(r => [r.sub_subject_name, agg[r.sub_subject_id] || 0]);
        
        const chartElement = this.$el.querySelector('.chart');
        
        var chart = c3.generate({
			bindto: chartElement,
			data: {
				columns: cols,
				type: 'pie'
			}
		});

	},

	components: {

	},

	vuex: {
		actions: {
			//createAssignment
		},

		getters: {
			currentUser: state => state.auth.currentUser,
			stories: state => state.story.stories,
			subjects: state => state.subject.subjects,

		}
	}
});

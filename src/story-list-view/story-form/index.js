const Vue = require('vue');
const vuex = require('vuex');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {

	},
	data: () => ({
		subject: {},
		obj: {
			sub_subject: '',
			name: '',
			description: '',
			tags: '',
			status: 4,
			id: ''
		},
		sbj: {}
	}),
	methods: {},
	computed: {},
	filters: {},
	components: {
		'subjects-selector': require('../../components/subjects-selector'),
		'tags-selector': require('../../components/tags-selector'),
		'status-selector': require('../../components/status-selector'),
		'slide-panel': require('../../components/slide-panel'),
	},
	ready() {},

	vuex: {
		getters: {
			subjects: state => state.subject.subjects,
			classes: state => state.class.classes,
		}
	}
});

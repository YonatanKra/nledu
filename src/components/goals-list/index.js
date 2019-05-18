/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const {
	createGoal
} = require('../../data/actions/goal');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		checkedGoals: []
	},
	data: {
		input_goal: ''
	},
	methods: {
		addGoal() {
			if (this.input_goal) {
				this.createGoal({name:this.input_goal});
                this.input_goal = '';
                componentHandler.upgradeDom();
			}
		}
	},
	computed: {


	},
	filters: {

	},
	ready() {
		componentHandler.upgradeDom();
	},

	components: {

		//	'lessons-list': require('../../lessons-list'),

	},

	vuex: {
		actions: {
			createGoal
		},

		getters: {
			goals: state => state.goal.goals
		}
	}

});

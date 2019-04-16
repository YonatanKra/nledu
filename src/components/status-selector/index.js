const Vue = require('vue');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		statusesFilter: '',
		selectedStatus: Number,
	},
	data: {

	},
	methods: {
		selectStatus(status, $event) {
			$event.srcElement.parentElement.parentElement.querySelectorAll('.mdl-button')
				.forEach(element => {
					element.classList.remove('mdl-button--colored')
				});

			$event.srcElement.parentElement.classList.add('mdl-button--colored');
			this.selectedStatus = parseInt(status.key);
		}
	},
	computed: {
		statusList: function () {
			return Object.keys(this.statuses).map(key => ({
				key,
				value: this.statuses[key]
			}));

		}
	},
	filters: {
		filterStatus(s) {
			return this.statusesFilter === '' ? s :
				s.filter(status => this.statusesFilter.indexOf(status.key) > -1)
		}
	},
	ready() {
		if(this.selectedStatus){
			const element = this.$el.querySelector('.mdl-button[data-key="'+parseInt(this.selectedStatus)+'"]')
			element.classList.add('mdl-button--colored');
		}
	},

	vuex: {
		actions: {},

		getters: {
			statuses: function (state) {
				return state.status.statuses
			},
		}
	}

});

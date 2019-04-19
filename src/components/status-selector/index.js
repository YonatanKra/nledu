const Vue = require('vue');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		statusesFilter: '',
		selectedStatus: Number,
		selectedStatusStr: String,
	},
	data: {

	},
	methods: {
		selectStatus(status, $event) {
			this.selectedStatus = parseInt(status.key);
			this.selectedStatusStr = status.key;
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
		this.selectedStatus = this.selectedStatus || 6;
		this.selectedStatusStr = '' + this.selectedStatus;
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

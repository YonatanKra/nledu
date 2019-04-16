const Vue = require('vue');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		cardTitle: String,
		cardSubTitle: String,
		cardClass: String
	},
	methods: {
		expandCard: function (event) {
			event.currentTarget.parentElement.classList.toggle('expand');

		}
	},
	ready() {
	}
});

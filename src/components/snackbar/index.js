const Vue = require('vue');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {	},
	methods: {	},
	ready() {
		window['counter'] = 0;
    }
});




const Vue = require('vue');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {	},
	methods: {	},
	ready() {

    }
});


window['counter'] = 0;

var snackbarContainer = document.querySelector('#demo-toast-example');


var data = {message: 'Example Message # ' + ++counter};
snackbarContainer.MaterialSnackbar.showSnackbar(data);

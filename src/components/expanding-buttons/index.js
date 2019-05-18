/*
Draws connector lines between passages.
*/
const Vue = require('vue');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
        selectedItem : Object,
        items : []
	},
	data: {

	},
	methods: {
        selectItem(item, $event) {
			$event.preventDefault();
			this.selectedItem = item;
		}
	},
	computed: {


	},
	filters: {

	},
	ready() {
		this.selectedItem = 	this.selectedItem || {};
	}

});

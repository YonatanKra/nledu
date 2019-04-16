/*
Draws connector lines between passages.
*/
const Vue = require('vue');


require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		panelTitle: String,
        toggleButton: String,
        panelSize: String
	},
	data: {

	},
	methods: {
		toggle(e) {
            this.$el.classList.toggle('open');
		},

	},
	computed: {


	},
	filters: {

	},
	created() {
      
	},

	ready() {
        var _this = this;
		if (this.toggleButton) {
			document.querySelector(this.toggleButton).addEventListener("click",  event=> {
                _this.$el.classList.toggle('open');
			});
		}

	},

});

/*
Draws connector lines between passages.
*/
const Vue = require('vue');
const vuex = require('vuex');
const domEvents = require('../../vue/mixins/dom-events');
const { thenable, symbols: { reject, resolve } } =
	require('../../vue/mixins/thenable');

require('./index.less');

const SlidePanel = module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		panelTitle: String,
        toggleButton: String,
		panelSize: String,
		origin: null,
		canWiden: false,
		canClose: {
			type: Function,
			required: false
		}
	},
	data: () => ({
		wide: false
	}),
	methods: {
		toggle(e) {
            this.$el.classList.toggle('open');
		},
		close(message) {
			
			if (typeof this.canClose === 'function' && !this.canClose()) {
				return;
			}

			this.$emit('close', message);
		},
		reject(message) {
			debugger;
			if (typeof this.canClose === 'function' && !this.canClose()) {
				return;
			}

			this.$emit('reject', message);
		}

	},
	destroyed() {
		debugger;
		let body = document.querySelector('body');

		//body.classList.remove('modalOpen');

		this.$emit('destroyed');
	},
	computed: {


	},
	events: {
		close(message) {
			this[resolve](message);
			this.$destroy(true);
		},

		reject(message) {
			this[reject](message);
			this.$destroy(true);
		}
	},

	mixins: [domEvents, thenable],

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
	vuex: {}

});

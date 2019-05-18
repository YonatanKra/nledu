/* Shows a modal dialog asking for a text response from the user. */

const Vue = require('vue');
const locale = require('../../locale');
const {
	thenable
} = require('../../vue/mixins/thenable');

require('./index.less');

const prompter = module.exports = {
	component: Vue.extend({
		template: require('./index.html'),

		data: () => ({
			title: '',
			panelSize: '',
			message: '',
			response: '',
			cancelLabel: ('<i class="fa fa-times"></i> ' + locale.say('Cancel')),
			buttonLabel: '',
			buttonClass: 'primary',
			modalClass: '',
			isValid: true,
			validationError: '',
			panelComponent: '',
			componentObject: Function,
			validator: function () {},

			origin: null
		}),

		ready() {
			this.$el.nextSibling.classList.toggle('open');
			if (this.componentObject) {
				const elem = this.$el.nextElementSibling.querySelector('.panel-body-holder');
				const com = this.componentObject();
				return new com({
					data: this._data,
					parent: this
				}).$mountTo(elem);
			}

			this.panelSize = this.panelSize || 'medium';
		},
		computed: {

		},

		methods: {
			accept() {
				debugger;
				this.isValid = true;
				const data = Object.assign({}, this._data);
				this.$broadcast('close', {
					data
				});
			},

			cancel() {
				this.$broadcast('close', false);
			},
			sholdLoad: function (directive) {
				debugger;
				return directive === this.panelComponent;
			}
		},

		components: {
			'slide-panel': require('../slide-panel'),
		},

		mixins: [thenable]
	}),

	prompt(data, context) {
		return new prompter.component({
			data: data,
			parent: context
		}).$mountTo(document.body).then(result => {
			if (!result) {
				throw result;
			}

			return result;
		});
	}
};

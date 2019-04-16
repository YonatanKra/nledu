const Vue = require('vue');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		tags: String,
	},

	data: {
		input_tag: ''
	},

	methods: {
		removeTags(tag) {
				if (tag) {
					this.tags = this.tags.split(',').filter(t => t !== tag).join(',');
				}
			},
			addTags() {
				if (this.input_tag) {
                    const t = this.tags === '' ? [] : this.tags.split(',');
                    
					if (t.indexOf(this.input_tag) === -1) {
						this.tags = t.concat(this.input_tag).join(',');
                    }
                    
                    this.input_tag = '';
                }
			}
		},
	computed: {
		tagsList: function () {
			return this.tags === '' ? [] : this.tags.split(',');
		}
	},
	filters: {
		filterStatus() {
			debugger;
		}
	},
	ready() {},

	vuex: {
		actions: {},

		getters: {}
	}
});
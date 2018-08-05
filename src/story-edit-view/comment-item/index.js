/*
Draws connector lines between passages.
*/

const uniq = require('lodash.uniq');
const Vue = require('vue');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		comment: {
			type: Object,
			required: true
		}
	},

	computed: {
		storycomment() {
			this.comment.commentedBy = 'User 1';
			return this.comment;
		}
	}
});

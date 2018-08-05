/*
Story format-related actions.
*/

const jsonp = require('jsonp');
const semverUtils = require('semver-utils');
const locale = require('../../locale');
const { setPref } = require('./pref');

const actions = module.exports = {
	createComment({ dispatch }, id, comment) {
		dispatch('CREATE_COMMENT', id, comment);
	},

	loadComments(store, name, version) {
		console.log ("TODO: load comments");
	}
};

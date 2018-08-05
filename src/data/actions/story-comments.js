/*
Story format-related actions.
*/

const jsonp = require('jsonp');
const semverUtils = require('semver-utils');
const locale = require('../../locale');
const { setPref } = require('./pref');

const actions = module.exports = {
	createComment({ dispatch }, id, text) {

		dispatch('CREATE_COMMENT', id, { content: text } );
	}
};

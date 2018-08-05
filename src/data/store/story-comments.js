// A Vuex module for working with story comments.

const uuid = require('tiny-uuid');
const locale = require('../../locale');

module.exports = {
	state: {
		comments: []
	},

	mutations: {
		CREATE_COMMENT(state, id, comment) {
			let newComment = {
				id : uuid(),
				storyId: id,
				content: comment
			}

			newComment.loaded = false;
			state.comments.push(newComment);
		},

		DELETE_COMMENT(state, id) {
			state.comments = state.comments.filter(
				comment => comment.id !== id
			);
		},

		LOAD_COMMENT(state, id, commentText) {
			let comment = state.comments.find(comment => comment.id === id);

			comment.text = commentText;
			comment.loaded = true;
		}
	}
};

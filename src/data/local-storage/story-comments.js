/* Functions for moving story formats in and out of local storage. */

const uuid = require('tiny-uuid');
const { createComment } = require('../actions/story-comments');

module.exports = {
	save(store) {

		const previouslySerialized =
			window.localStorage.getItem('twine-storycomments');

		if (previouslySerialized) {
			previouslySerialized.split(',').forEach(id => {
				window.localStorage.removeItem('twine-storycomments-' + id);
			});
		}

		/* Save new ones. */

		let ids = [];

		store.state.storyComments.comments.forEach(comment => {
			const id = uuid();

			ids.push(id);
			window.localStorage.setItem(
				'twine-storycomments-' + id,
				JSON.stringify(comment)
			);
		});

		window.localStorage.setItem('twine-storycomments', ids.join(','));
	},

	load(store) {
		const serialized = window.localStorage.getItem('twine-storycomments');

		if (!serialized) {
			return;
		}

		serialized.split(',').forEach(id => {
			try {
				const item = JSON.parse(
					window.localStorage.getItem('twine-storycomments-' + id)
				);

				createComment(store, item.storyId, item);
			}
			catch (e) {
				console.warn(
					`Story comment ${id} had corrupt serialized value, skipping`,
					window.localStorage.getItem('twine-storycomments-' + id)
				);
			}
		});
	}
};

let {
	loadProgress,
	updateProgress
} = require('../actions/progress');

const localStorageKeyName = 'progress-tracker';

const progress = module.exports = {
	load(store) {
		const data = window.localStorage.getItem(localStorageKeyName);

		loadProgress(store,data ? JSON.parse(data):{});
    },

	updateProgress(store, storyId, passageId,progress) {
		const data = window.localStorage.getItem(localStorageKeyName);
		let progressTracker;

		if (data) {
			progressTracker = JSON.parse(data);
			progressTracker[storyId] = progressTracker[storyId] || {};
			progressTracker[storyId][passageId] = progress;

		} else {
			progressTracker = {};
			progressTracker[storyId] = {};
			progressTracker[storyId][passageId] = progress;
		}
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(progressTracker));
	}
};
